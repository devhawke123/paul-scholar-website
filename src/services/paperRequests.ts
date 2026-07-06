import { supabase } from '../lib/supabase'
import type { PaperRequest, PaperRequestInput } from '../types/paperRequest'
import { mapPaperRequestRow, type PaperRequestRow } from './mappers'

export async function fetchPaperRequests(): Promise<PaperRequest[]> {
  const { data, error } = await supabase
    .from('paper_requests')
    .select('*, papers(title)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data as PaperRequestRow[]).map(mapPaperRequestRow)
}

export async function countRequestsFor(email: string, paperId: string): Promise<number> {
  const { count, error } = await supabase
    .from('paper_requests')
    .select('id', { count: 'exact', head: true })
    .eq('email', email)
    .eq('paper_id', paperId)
  if (error) throw error
  return count ?? 0
}

export async function createPaperRequest(input: PaperRequestInput): Promise<void> {
  const { error } = await supabase.from('paper_requests').insert({
    full_name: input.fullName,
    email: input.email,
    paper_id: input.paperId,
    reason: input.reason,
  })
  if (error) throw error
}

export async function approvePaperRequest(requestId: string): Promise<void> {
  const { data, error } = await supabase.functions.invoke('approve-paper-request', {
    body: { requestId },
  })
  if (error) throw error
  if (!data?.ok) throw new Error(data?.error ?? 'Failed to approve request')
}

export async function rejectPaperRequest(requestId: string): Promise<void> {
  const { error } = await supabase
    .from('paper_requests')
    .update({ status: 'Rejected', updated_at: new Date().toISOString() })
    .eq('id', requestId)
  if (error) throw error
}
