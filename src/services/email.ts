const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string
const ENDPOINT = 'https://api.web3forms.com/submit'

async function post(body: Record<string, string>) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: ACCESS_KEY, ...body }),
  })
  const json = (await res.json()) as { success: boolean; message?: string }
  if (!json.success) throw new Error(json.message ?? 'Submission failed')
}

export async function sendPaperRequest(params: {
  paperTitle: string
  requesterEmail: string
  reason: string
}) {
  await post({
    subject: `Paper Access Request – ${params.paperTitle}`,
    from_name: params.requesterEmail,
    email: params.requesterEmail,
    paper_title: params.paperTitle,
    reason: params.reason,
  })
}

export async function sendContactForm(params: {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}) {
  await post({
    subject: `New Enquiry from ${params.firstName} ${params.lastName}`,
    from_name: `${params.firstName} ${params.lastName}`,
    email: params.email,
    phone: params.phone,
    message: params.message,
  })
}
