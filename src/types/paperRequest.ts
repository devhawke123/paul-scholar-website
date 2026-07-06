export type RequestStatus = 'Pending' | 'Approved' | 'Rejected'

export type PaperRequest = {
  id: string
  fullName: string
  email: string
  paperId: string
  paperTitle: string
  reason: string
  status: RequestStatus
  createdAt: string
}

export type PaperRequestInput = {
  fullName: string
  email: string
  paperId: string
  reason: string
}
