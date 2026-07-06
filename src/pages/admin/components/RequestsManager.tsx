import { useMemo, useState } from 'react'
import { approvePaperRequest, rejectPaperRequest } from '../../../services/paperRequests'
import { usePaperRequests } from '../../../hooks/usePaperRequests'
import { Button } from '../../../components/ui/Button'
import type { PaperRequest, RequestStatus } from '../../../types/paperRequest'

function IconClock() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0"
    >
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  )
}

const statusBadgeClasses: Record<RequestStatus, string> = {
  Pending: 'bg-amber-50 text-amber-700',
  Approved: 'bg-green-50 text-green-700',
  Rejected: 'bg-red-50 text-red-700',
}

const filters = ['All', 'Pending', 'Approved', 'Rejected'] as const
type Filter = (typeof filters)[number]

function formatRequestDate(value: string) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function StatsBar({ requests }: { requests: PaperRequest[] }) {
  const pending = requests.filter((r) => r.status === 'Pending').length
  const approved = requests.filter((r) => r.status === 'Approved').length
  const rejected = requests.filter((r) => r.status === 'Rejected').length
  return (
    <div className="mt-6 flex gap-px overflow-hidden rounded-xl border border-navy/10 bg-navy/10">
      <div className="flex flex-1 flex-col bg-white px-5 py-4">
        <span className="text-2xl font-semibold text-navy">{requests.length}</span>
        <span className="mt-0.5 text-xs text-navy/50">Total requests</span>
      </div>
      <div className="flex flex-1 flex-col bg-white px-5 py-4">
        <span className="text-2xl font-semibold text-navy">{pending}</span>
        <span className="mt-0.5 text-xs text-navy/50">Pending</span>
      </div>
      <div className="flex flex-1 flex-col bg-white px-5 py-4">
        <span className="text-2xl font-semibold text-navy">{approved}</span>
        <span className="mt-0.5 text-xs text-navy/50">Approved</span>
      </div>
      <div className="flex flex-1 flex-col bg-white px-5 py-4">
        <span className="text-2xl font-semibold text-navy">{rejected}</span>
        <span className="mt-0.5 text-xs text-navy/50">Rejected</span>
      </div>
    </div>
  )
}

export function RequestsManager() {
  const { data: requests, isLoading, error, refetch } = usePaperRequests()
  const [filter, setFilter] = useState<Filter>('All')
  const [pendingActionId, setPendingActionId] = useState<string | null>(null)

  const visibleRequests = useMemo(
    () => requests.filter((r) => filter === 'All' || r.status === filter),
    [requests, filter],
  )

  async function handleApprove(request: PaperRequest) {
    if (
      !window.confirm(
        `Approve ${request.fullName}'s request for "${request.paperTitle}"? They'll be emailed the paper.`,
      )
    )
      return
    setPendingActionId(request.id)
    try {
      await approvePaperRequest(request.id)
      await refetch()
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Failed to approve request.')
    } finally {
      setPendingActionId(null)
    }
  }

  async function handleReject(request: PaperRequest) {
    if (!window.confirm(`Reject ${request.fullName}'s request for "${request.paperTitle}"?`)) return
    setPendingActionId(request.id)
    try {
      await rejectPaperRequest(request.id)
      await refetch()
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Failed to reject request.')
    } finally {
      setPendingActionId(null)
    }
  }

  return (
    <section className="px-4 py-12 md:px-11 md:py-16">
      <div className="mx-auto max-w-[1154px]">
        <div>
          <h1 className="text-3xl font-bold text-navy md:text-4xl">Access Requests</h1>
          <p className="mt-2 max-w-2xl text-base text-navy/70">
            Review requests for restricted papers. Approving a request emails the paper to the
            requester; rejecting denies access.
          </p>
        </div>

        <StatsBar requests={requests} />

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f ? 'bg-navy text-white' : 'bg-navy/5 text-navy/70 hover:bg-navy/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-navy/10 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-navy/10 px-6 py-4">
            <h2 className="font-semibold text-navy">Requests</h2>
            <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy/70">
              {visibleRequests.length} shown
            </span>
          </div>

          {error && (
            <div className="px-6 py-16 text-center">
              <p className="text-red-600">Failed to load requests. Please refresh the page.</p>
            </div>
          )}

          {!error && isLoading && (
            <div className="px-6 py-16 text-center">
              <p className="text-navy/60">Loading requests…</p>
            </div>
          )}

          {!error && !isLoading && visibleRequests.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-navy/60">No requests to show.</p>
            </div>
          )}

          {!error && !isLoading && visibleRequests.length > 0 && (
            <ul className="divide-y divide-navy/10">
              {visibleRequests.map((request) => (
                <li
                  key={request.id}
                  className="flex flex-col gap-4 px-6 py-6 transition hover:bg-navy/[0.025] md:flex-row md:items-start md:justify-between"
                >
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-medium text-navy">{request.fullName}</h3>
                      <span
                        className={`rounded-full px-3 py-0.5 text-xs font-medium ${statusBadgeClasses[request.status]}`}
                      >
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-navy/70">{request.email}</p>
                    <p className="text-sm text-navy/70">
                      Requested: <span className="font-medium text-navy">{request.paperTitle}</span>
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-navy/60">
                      <IconClock />
                      {formatRequestDate(request.createdAt)}
                    </span>
                  </div>

                  {request.status === 'Pending' && (
                    <div className="flex items-center gap-2 md:shrink-0">
                      <Button
                        variant="outline"
                        disabled={pendingActionId === request.id}
                        onClick={() => void handleApprove(request)}
                        className="h-10 rounded-full border-green-600/40 px-5 text-sm text-green-700 hover:border-green-600 hover:bg-green-50 disabled:opacity-50"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="ghost"
                        disabled={pendingActionId === request.id}
                        onClick={() => void handleReject(request)}
                        className="h-10 rounded-full px-5 text-sm text-red-700 hover:text-red-800 disabled:opacity-50"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
