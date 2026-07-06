import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Always respond 200 — supabase-js discards the body and throws a generic
// error for any non-2xx status, so `ok`/`error` in the body is the only
// signal the caller can actually read. Do not pass a non-200 status here.
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { requestId } = (await req.json()) as { requestId?: string }
    if (!requestId) {
      return json({ ok: false, error: 'requestId is required' })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { data: paperRequest, error: requestError } = await supabase
      .from('paper_requests')
      .select('id, full_name, email, status, paper_id')
      .eq('id', requestId)
      .single()

    if (requestError || !paperRequest) {
      return json({ ok: false, error: 'Request not found' })
    }
    if (paperRequest.status !== 'Pending') {
      return json({ ok: false, error: `Request is already ${paperRequest.status}` })
    }

    const { data: paper, error: paperError } = await supabase
      .from('papers')
      .select('title, pdf_url')
      .eq('id', paperRequest.paper_id)
      .single()

    if (paperError || !paper?.pdf_url) {
      return json({ ok: false, error: 'Paper or PDF not found' })
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      return json({ ok: false, error: 'Email is not configured (missing RESEND_API_KEY)' })
    }
    const fromEmail = Deno.env.get('RESEND_FROM_EMAIL') ?? 'onboarding@resend.dev'

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: paperRequest.email,
        subject: `Your access request for "${paper.title}" has been approved`,
        html: `
          <p>Hi ${escapeHtml(paperRequest.full_name)},</p>
          <p>Your request for access to <strong>${escapeHtml(paper.title)}</strong> has been approved.</p>
          <p>
            <a href="${paper.pdf_url}" style="display:inline-block;padding:12px 24px;background:#0b1f3a;color:#ffffff;border-radius:9999px;text-decoration:none;">
              Download Paper
            </a>
          </p>
          <p>If the button doesn't work, use this link: ${paper.pdf_url}</p>
        `,
      }),
    })

    if (!emailRes.ok) {
      const detail = await emailRes.text()
      return json({ ok: false, error: `Failed to send email: ${detail}` })
    }

    const { error: updateError } = await supabase
      .from('paper_requests')
      .update({ status: 'Approved', updated_at: new Date().toISOString() })
      .eq('id', requestId)

    if (updateError) {
      return json({ ok: false, error: 'Email sent, but failed to update status' })
    }

    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: err instanceof Error ? err.message : 'Unknown error' })
  }
})
