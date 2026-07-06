function parseJsonMessage(value: string): string | null {
  try {
    const parsed = JSON.parse(value) as { message?: string; error?: string }
    if (typeof parsed.message === 'string' && parsed.message.trim()) return parsed.message
    if (typeof parsed.error === 'string' && parsed.error.trim()) return parsed.error
  } catch {
    // not JSON
  }
  return null
}

function unwrapPrefixedJson(raw: string, prefix: string): string | null {
  if (!raw.startsWith(prefix)) return null
  return parseJsonMessage(raw.slice(prefix.length).trim())
}

export function formatErrorMessage(
  err: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  const raw =
    err instanceof Error ? err.message : typeof err === 'string' ? err : fallback

  const fromEmailError =
    unwrapPrefixedJson(raw, 'Failed to send email: ') ??
    unwrapPrefixedJson(raw, 'Failed to send email:')

  if (fromEmailError) return fromEmailError

  const fromJson = parseJsonMessage(raw.trim())
  if (fromJson) return fromJson

  return raw.trim() || fallback
}
