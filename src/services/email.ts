const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined
const ENDPOINT = 'https://api.web3forms.com/submit'

function log(message: string, ...details: unknown[]) {
  if (import.meta.env.DEV) console.log(`[email] ${message}`, ...details)
}

async function post(body: Record<string, string>, kind: string) {
  const accessKey = ACCESS_KEY?.trim()
  if (!accessKey) {
    log(`${kind} failed — VITE_WEB3FORMS_ACCESS_KEY is missing`)
    throw new Error(
      'Email is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to .env and restart the dev server.',
    )
  }

  log(`Sending ${kind}…`, { subject: body.subject, email: body.email })

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: accessKey, ...body }),
  })

  let json: { success: boolean; message?: string }
  try {
    json = (await res.json()) as { success: boolean; message?: string }
  } catch {
    log(`${kind} failed — non-JSON response`, { status: res.status })
    throw new Error('Unexpected response from email service. Check your access key.')
  }

  if (!json.success) {
    log(`${kind} failed`, { status: res.status, message: json.message })
    throw new Error(json.message ?? 'Submission failed')
  }

  log(`${kind} sent successfully`, json.message ?? 'OK')
}

export async function sendPaperRequest(params: {
  paperTitle: string
  requesterEmail: string
  reason: string
}) {
  await post(
    {
      subject: `Paper Access Request – ${params.paperTitle}`,
      email: params.requesterEmail,
      paper_title: params.paperTitle,
      message: `Paper requested: ${params.paperTitle}\n\nReason for access:\n${params.reason}`,
      reason: params.reason,
    },
    'paper request',
  )
}

export async function sendContactForm(params: {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}) {
  await post(
    {
      subject: `New Enquiry from ${params.firstName} ${params.lastName}`,
      name: `${params.firstName} ${params.lastName}`,
      email: params.email,
      phone: params.phone,
      message: params.message,
    },
    'contact form',
  )
}
