# Paper Access Requests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Web3Forms email-relay paper-request flow with an in-app request record, an "Access Requests" admin tab with approve/reject actions, and a Supabase Edge Function that emails the approved requester a link to the paper.

**Architecture:** New `paper_requests` Supabase table (open RLS, matching existing `papers`/`blog_posts`). Frontend gets a `paperRequests` service + hook mirroring the existing `papers` service/hook pattern exactly. The request modal writes rows directly (client → Supabase, same as everywhere else in this app); only the Approve action needs a server component (sending email to an arbitrary third party), so it's the sole caller of a new Supabase Edge Function (`approve-paper-request`) using Resend. Reject is a plain client-side status update.

**Tech Stack:** React 19 + TypeScript + Vite, Tailwind v4, `@supabase/supabase-js` (client), Supabase Edge Functions (Deno) + Resend HTTP API (no new npm dependency), Supabase MCP tools (`apply_migration`, `deploy_edge_function`) for backend changes.

## Global Constraints

- Supabase project ref: `ltsdsowevesmoghbjijf` (confirm via `mcp__supabase__list_projects` before first use — the host in `.env.example`'s `VITE_SUPABASE_URL` is `ltsdsowevesmoghbjijf.supabase.co`).
- No new npm dependencies. No test framework exists in this repo (`package.json` has no vitest/jest) — do not add one. Verification is `npm run build` (runs `tsc -b`), `npm run lint`, and the manual end-to-end walkthrough in Task 7. This replaces the usual "write a failing test" step throughout this plan.
- Follow existing conventions exactly: services in `src/services/`, hooks in `src/hooks/`, admin sub-pages in `src/pages/admin/components/`, `Button` component variants only (no new variant — override color via `className` like the existing Delete button does), badge convention `bg-{color}-50 text-{color}-700`, brand hex `navy = #0b1f3a` / `accent = #ffa947` (from `tailwind.config.ts`) for anything that needs a literal color (e.g. email HTML).
- Do not touch: `src/services/email.ts`'s `sendContactForm`, the Contact page, admin auth (there is none, and none is being added), paper storage/bucket configuration (stays public).
- The `RESEND_API_KEY` secret must be set on the Supabase project by the user outside this plan (Dashboard → Edge Functions → Secrets, or `supabase secrets set RESEND_API_KEY=...`) — no MCP tool sets secrets. Flag this clearly at the end of Task 6.

---

### Task 1: Database — `paper_requests` table

**Files:**
- Modify: `supabase/seed.sql` (append table + RLS, documentation copy only — not executed by this task, just kept in sync with the live schema)
- No frontend files touched in this task.

**Interfaces:**
- Produces: table `paper_requests(id uuid, full_name text, email text, paper_id uuid, reason text, status text, created_at timestamptz, updated_at timestamptz)`, referenced by every later task.

- [ ] **Step 1: Confirm the Supabase project id**

Call `mcp__supabase__list_projects`. Find the project whose API URL host matches `ltsdsowevesmoghbjijf` (from `.env.example`'s `VITE_SUPABASE_URL`). Use its `id` as `project_id` for every Supabase MCP call in this plan.

- [ ] **Step 2: Apply the migration**

Call `mcp__supabase__apply_migration` with `project_id` from Step 1, `name: "create_paper_requests"`, and this `query`:

```sql
create table paper_requests (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null,
  email       text not null,
  paper_id    uuid not null references papers(id) on delete cascade,
  reason      text not null,
  status      text not null default 'Pending' check (status in ('Pending','Approved','Rejected')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index paper_requests_email_paper_idx on paper_requests(email, paper_id);

alter table paper_requests enable row level security;

create policy "public can read paper_requests" on paper_requests for select using (true);
create policy "anon can insert paper_requests" on paper_requests for insert with check (true);
create policy "anon can update paper_requests" on paper_requests for update using (true);
```

- [ ] **Step 3: Verify the table exists**

Call `mcp__supabase__execute_sql` with the same `project_id` and query:

```sql
select column_name, data_type from information_schema.columns where table_name = 'paper_requests' order by ordinal_position;
```

Expected: 8 rows (`id`, `full_name`, `email`, `paper_id`, `reason`, `status`, `created_at`, `updated_at`).

- [ ] **Step 4: Document the table in `supabase/seed.sql`**

Open `supabase/seed.sql`. Immediately after the closing `);` of the existing `papers` table definition (before the `-- ── RLS` comment block), insert:

```sql

create table if not exists paper_requests (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null,
  email       text not null,
  paper_id    uuid not null references papers(id) on delete cascade,
  reason      text not null,
  status      text not null default 'Pending' check (status in ('Pending','Approved','Rejected')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists paper_requests_email_paper_idx on paper_requests(email, paper_id);
```

Then, inside the existing "RLS" section, after the three `papers` policies (`anon can insert/update/delete papers`), add:

```sql
alter table paper_requests enable row level security;

create policy "public can read paper_requests" on paper_requests for select using (true);
create policy "anon can insert paper_requests" on paper_requests for insert with check (true);
create policy "anon can update paper_requests" on paper_requests for update using (true);
```

- [ ] **Step 5: Commit**

```bash
git add supabase/seed.sql
git commit -m "docs: document paper_requests table in seed.sql"
```

---

### Task 2: Types + row mapper

**Files:**
- Create: `src/types/paperRequest.ts`
- Modify: `src/services/mappers.ts`

**Interfaces:**
- Consumes: nothing (pure types/mapping).
- Produces: `PaperRequest`, `RequestStatus`, `PaperRequestInput` types; `PaperRequestRow` type and `mapPaperRequestRow(row)` function — consumed by Task 3's service.

- [ ] **Step 1: Create the type file**

Write `src/types/paperRequest.ts`:

```ts
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
```

- [ ] **Step 2: Add the row type and mapper to `mappers.ts`**

In `src/services/mappers.ts`, add this import at the top (alongside the existing `Paper`/`PaperInput` import):

```ts
import type { PaperRequest, RequestStatus } from '../types/paperRequest'
```

Then append at the end of the file:

```ts
export type PaperRequestRow = {
  id: string
  full_name: string
  email: string
  paper_id: string
  reason: string
  status: string
  created_at: string
  papers: { title: string } | null
}

export function mapPaperRequestRow(row: PaperRequestRow): PaperRequest {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    paperId: row.paper_id,
    paperTitle: row.papers?.title ?? 'Unknown paper',
    reason: row.reason,
    status: row.status as RequestStatus,
    createdAt: row.created_at,
  }
}
```

- [ ] **Step 3: Typecheck**

Run: `npm run build`
Expected: no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/types/paperRequest.ts src/services/mappers.ts
git commit -m "feat: add paper request types and row mapper"
```

---

### Task 3: Service layer + hook

**Files:**
- Create: `src/services/paperRequests.ts`
- Create: `src/hooks/usePaperRequests.ts`

**Interfaces:**
- Consumes: `mapPaperRequestRow`, `PaperRequestRow` from Task 2 (`src/services/mappers.ts`); `PaperRequest`, `PaperRequestInput`, `RequestStatus` from `src/types/paperRequest.ts`; `supabase` client from `src/lib/supabase.ts`.
- Produces: `fetchPaperRequests()`, `countRequestsFor(email, paperId)`, `createPaperRequest(input)`, `approvePaperRequest(requestId)`, `rejectPaperRequest(requestId)` — consumed by Task 4 (modal) and Task 5 (admin manager). `usePaperRequests()` hook — consumed by Task 5.

- [ ] **Step 1: Write the service**

Create `src/services/paperRequests.ts`:

```ts
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
```

- [ ] **Step 2: Write the hook**

Create `src/hooks/usePaperRequests.ts`:

```ts
import { useCallback, useEffect, useState } from 'react'
import { fetchPaperRequests } from '../services/paperRequests'
import type { PaperRequest } from '../types/paperRequest'

export function usePaperRequests() {
  const [data, setData] = useState<PaperRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      setData(await fetchPaperRequests())
    } catch (err) {
      console.error('[usePaperRequests] fetch failed:', err)
      setError(err instanceof Error ? err : new Error('Failed to load requests'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return { data, isLoading, error, refetch: load }
}
```

- [ ] **Step 3: Typecheck**

Run: `npm run build`
Expected: no TypeScript errors. (`approvePaperRequest`'s edge function doesn't exist yet — that's fine, `supabase.functions.invoke` is a generic client method and compiles regardless.)

- [ ] **Step 4: Commit**

```bash
git add src/services/paperRequests.ts src/hooks/usePaperRequests.ts
git commit -m "feat: add paper requests service and hook"
```

---

### Task 4: Update the request form (`PaperRequestModal.tsx`)

**Files:**
- Modify: `src/components/papers/PaperRequestModal.tsx`

**Interfaces:**
- Consumes: `countRequestsFor`, `createPaperRequest` from Task 3 (`src/services/paperRequests.ts`).
- Produces: no new exports — same `PaperRequestModal({ paper, onClose })` component signature, used unchanged by `PaperListItem.tsx` and `PaperCard.tsx`.

- [ ] **Step 1: Replace the email import with the new service import**

In `src/components/papers/PaperRequestModal.tsx`, replace:

```ts
import { sendPaperRequest } from '../../services/email'
```

with:

```ts
import { countRequestsFor, createPaperRequest } from '../../services/paperRequests'
```

- [ ] **Step 2: Add `fullName` state**

Replace:

```ts
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
```

with:

```ts
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
```

- [ ] **Step 3: Replace `handleSubmit` with the cap check + new create call**

Replace the whole `handleSubmit` function:

```ts
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      await sendPaperRequest({
        paperTitle: paper.title,
        requesterEmail: email.trim(),
        reason: reason.trim(),
      })
      setStatus('success')
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to send request. Please try again.'
      setErrorMsg(message)
      setStatus('error')
    }
  }
```

with:

```ts
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const trimmedEmail = email.trim()
      const existingCount = await countRequestsFor(trimmedEmail, paper.id)
      if (existingCount >= 2) {
        setErrorMsg("You've reached the maximum number of requests for this paper.")
        setStatus('error')
        return
      }
      await createPaperRequest({
        fullName: fullName.trim(),
        email: trimmedEmail,
        paperId: paper.id,
        reason: reason.trim(),
      })
      setStatus('success')
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to send request. Please try again.'
      setErrorMsg(message)
      setStatus('error')
    }
  }
```

- [ ] **Step 4: Add the Full Name field to the form**

Replace the opening of the `<form>` block:

```tsx
            <form onSubmit={(e) => void handleSubmit(e)} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-navy">Your email</span>
```

with:

```tsx
            <form onSubmit={(e) => void handleSubmit(e)} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-navy">Full name</span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-navy">Your email</span>
```

- [ ] **Step 5: Update the success-panel copy**

Replace:

```tsx
            <h2 className="mt-4 text-xl font-bold text-navy">Request sent!</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy/70">
              We&apos;ll review your request and send{' '}
              <span className="font-medium text-navy">&ldquo;{paper.title}&rdquo;</span> to{' '}
              <strong>{email}</strong> shortly.
            </p>
```

with:

```tsx
            <h2 className="mt-4 text-xl font-bold text-navy">Request received!</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy/70">
              We&apos;ll review your request for{' '}
              <span className="font-medium text-navy">&ldquo;{paper.title}&rdquo;</span> and email{' '}
              <strong>{email}</strong> if it&apos;s approved.
            </p>
```

- [ ] **Step 6: Typecheck and lint**

Run: `npm run build && npm run lint`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/papers/PaperRequestModal.tsx
git commit -m "feat: collect full name and persist paper requests instead of emailing"
```

---

### Task 5: Admin "Access Requests" tab

**Files:**
- Create: `src/pages/admin/components/RequestsManager.tsx`
- Modify: `src/pages/admin/AdminPage.tsx`

**Interfaces:**
- Consumes: `usePaperRequests` (Task 3), `approvePaperRequest`/`rejectPaperRequest` (Task 3), `PaperRequest`/`RequestStatus` types (Task 2), `Button` from `src/components/ui/Button.tsx`.
- Produces: `RequestsManager` component (default export style matches existing named exports, e.g. `export function RequestsManager()`), rendered from `AdminPage.tsx`.

- [ ] **Step 1: Create `RequestsManager.tsx`**

Write `src/pages/admin/components/RequestsManager.tsx`:

```tsx
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
```

- [ ] **Step 2: Wire the tab into `AdminPage.tsx`**

Replace the full contents of `src/pages/admin/AdminPage.tsx`:

```tsx
import { AdminNavbar } from './components/AdminNavbar'
import { BlogsManager } from './components/BlogsManager'
import { PapersManager } from './components/PapersManager'
import { RequestsManager } from './components/RequestsManager'
import { useState } from 'react'

const tabs = [
  { id: 'papers', label: 'Papers' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'requests', label: 'Access Requests' },
] as const

type Tab = (typeof tabs)[number]['id']

export function AdminPage() {
  const [activeSection, setActiveSection] = useState<Tab>('papers')

  return (
    <div className="min-h-screen bg-cream text-navy">
      <AdminNavbar />
      <main>
        {/* Tab bar */}
        <div className="border-b border-navy/10 px-4 md:px-11">
          <div className="mx-auto flex max-w-[1154px] gap-1">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSection(id)}
                className={`relative px-5 py-3.5 text-sm font-medium transition-colors ${
                  activeSection === id ? 'text-navy' : 'text-navy/50 hover:text-navy/80'
                }`}
              >
                {label}
                {activeSection === id && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        {activeSection === 'papers' && <PapersManager />}
        {activeSection === 'blogs' && <BlogsManager />}
        {activeSection === 'requests' && <RequestsManager />}
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Typecheck and lint**

Run: `npm run build && npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/admin/components/RequestsManager.tsx src/pages/admin/AdminPage.tsx
git commit -m "feat: add Access Requests admin tab with approve/reject actions"
```

---

### Task 6: Approve edge function (Resend email)

**Files:**
- Create: `supabase/functions/approve-paper-request/index.ts`

**Interfaces:**
- Consumes: `paper_requests` and `papers` tables (Task 1); called by `approvePaperRequest()` in `src/services/paperRequests.ts` (Task 3), which is already written to call `supabase.functions.invoke('approve-paper-request', { body: { requestId } })` and expects a JSON response shaped `{ ok: true }` or `{ ok: false, error: string }`.
- Produces: deployed edge function `approve-paper-request` on the Supabase project.

- [ ] **Step 1: Write the function**

Create `supabase/functions/approve-paper-request/index.ts`:

```ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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
      return json({ ok: false, error: 'requestId is required' }, 400)
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
      return json({ ok: false, error: 'Request not found' }, 404)
    }
    if (paperRequest.status !== 'Pending') {
      return json({ ok: false, error: `Request is already ${paperRequest.status}` }, 409)
    }

    const { data: paper, error: paperError } = await supabase
      .from('papers')
      .select('title, pdf_url')
      .eq('id', paperRequest.paper_id)
      .single()

    if (paperError || !paper?.pdf_url) {
      return json({ ok: false, error: 'Paper or PDF not found' }, 404)
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      return json({ ok: false, error: 'Email is not configured (missing RESEND_API_KEY)' }, 500)
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
      return json({ ok: false, error: `Failed to send email: ${detail}` }, 502)
    }

    const { error: updateError } = await supabase
      .from('paper_requests')
      .update({ status: 'Approved', updated_at: new Date().toISOString() })
      .eq('id', requestId)

    if (updateError) {
      return json({ ok: false, error: 'Email sent, but failed to update status' }, 500)
    }

    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: err instanceof Error ? err.message : 'Unknown error' }, 500)
  }
})
```

- [ ] **Step 2: Deploy the function**

Call `mcp__supabase__deploy_edge_function` with:
- `project_id`: from Task 1, Step 1
- `name`: `"approve-paper-request"`
- `entrypoint_path`: `"index.ts"`
- `verify_jwt`: `true`
- `files`: `[{ "name": "index.ts", "content": "<the full file content from Step 1>" }]`

- [ ] **Step 3: Tell the user about the required secret**

State clearly to the user (not a code step — a message in this conversation): "The edge function is deployed but won't send email until `RESEND_API_KEY` is set as a secret on the Supabase project. Sign up at resend.com, create an API key, then set it via the Supabase Dashboard (Edge Functions → Secrets) or `supabase secrets set RESEND_API_KEY=re_xxx`. Optionally also set `RESEND_FROM_EMAIL` once you've verified a sending domain — until then it defaults to Resend's shared test address `onboarding@resend.dev`, which works but is best for testing, not production volume."

- [ ] **Step 4: Commit**

```bash
git add supabase/functions/approve-paper-request/index.ts
git commit -m "feat: add approve-paper-request edge function (Resend email on approval)"
```

---

### Task 7: End-to-end verification

**Files:** none (manual verification only — no test framework exists in this repo to automate this in).

**Interfaces:**
- Consumes: the full feature built in Tasks 1-6.
- Produces: confirmation the feature works, or a list of concrete bugs to fix before calling this done.

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: Vite starts without errors, prints a local URL.

- [ ] **Step 2: Submit a request from the Library page**

Navigate to the Library page in a browser, find a paper with `access: 'Restricted'` (check via the admin Papers tab if unsure which one), click Request, fill in Full Name + email + reason, submit.
Expected: success panel reads "Request received!" with no email-sending error. No network call to `api.web3forms.com` in the browser Network tab.

- [ ] **Step 3: Verify the row landed in Supabase**

Call `mcp__supabase__execute_sql` with the project id and:

```sql
select full_name, email, paper_id, status, created_at from paper_requests order by created_at desc limit 5;
```

Expected: the row from Step 2, `status = 'Pending'`.

- [ ] **Step 4: Hit the 2-request cap**

Submit two more requests from the same browser for the *same* paper and *same* email (3rd total).
Expected: the first repeat (2nd total) succeeds; the second repeat (3rd total) is blocked client-side with the message "You've reached the maximum number of requests for this paper." and does not insert a 3rd row (re-check with the query from Step 3 — still only 2 rows for that email/paper pair).

- [ ] **Step 5: Approve a pending request in the admin panel**

Go to `/admin`, open the "Access Requests" tab, confirm the new tab appears alongside Papers/Blogs, confirm the stats bar and Pending filter show the request from Step 2. Click Approve, confirm the `window.confirm` dialog, confirm it.
Expected: request disappears from the Pending filter (moves under Approved), status badge turns green. Check the requester's inbox (or Resend's dashboard logs if `RESEND_API_KEY` isn't configured yet) for the approval email with a working "Download Paper" link pointing at the paper's `pdf_url`.

- [ ] **Step 6: Reject a pending request**

Submit one more test request, then reject it from the admin panel.
Expected: status badge turns red ("Rejected"), no email sent, no edge function invoked (confirm in Network tab — no request to `.../functions/v1/approve-paper-request`).

- [ ] **Step 7: Regression-check the untouched paths**

Confirm the Contact page still submits via Web3Forms successfully (unrelated to this feature, but shares `email.ts`). Confirm Papers/Blogs admin tabs still work (Add/Edit/Delete papers, since `AdminPage.tsx` was modified).

- [ ] **Step 8: Final build check**

Run: `npm run build && npm run lint`
Expected: both succeed with no errors.

---

## Self-Review Notes

- **Spec coverage:** Full Name field (Task 4), no email on submit (Task 4), Access Requests tab with table/list of Full Name/Email/Paper/Date/Status (Task 5), Approve/Reject buttons in green/red (Task 5), approval sends email with paper link only to that user (Task 6), 2-requests-per-email-per-paper cap (Task 4 + verified Task 7), status persistence and filtering (Tasks 1, 5) — all covered.
- **Type consistency checked:** `PaperRequest`/`PaperRequestInput`/`RequestStatus` (Task 2) used identically in `paperRequests.ts` (Task 3), `PaperRequestModal.tsx` (Task 4), and `RequestsManager.tsx` (Task 5) — field names (`fullName`, `paperId`, `paperTitle`, `createdAt`) match everywhere.
- **No placeholders:** every step has complete, runnable code.
