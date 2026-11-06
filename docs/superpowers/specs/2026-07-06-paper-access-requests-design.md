# Paper Access Requests — Design Spec

Date: 2026-07-06

## Problem

Restricted-paper access requests (from Home and Library pages) currently
submit straight to Web3Forms, which relays a notification email to the site
owner's inbox. There is no persistence, no admin visibility, and no way to
actually grant access — the admin has to manually email the paper back.

## Goal

Replace the email-relay submission with an in-app request record, add an
"Access Requests" tab to the admin panel for reviewing/approving/rejecting
requests, and have approval trigger a real email to the requester containing
a link to the paper.

## Decisions locked in during brainstorming

- **Storage stays as-is.** Restricted PDFs remain in the current public
  Supabase Storage bucket with public `pdf_url`s. This feature does not add
  signed URLs or a private bucket — the approval email links directly to the
  existing public `pdf_url`. (Note: this means "Restricted" remains a UI
  convention, not enforced file-level access control — a pre-existing
  condition of the app, out of scope here.)
- **Delivery**: signed/plain link in the email body ("Download Paper"
  button), not an attachment — avoids attachment size limits.
- **Email sending**: new Supabase Edge Function using Resend. The existing
  Web3Forms integration (`src/services/email.ts`) cannot send to arbitrary
  third-party addresses — it only relays contact-form submissions to the
  site owner. Web3Forms usage for the Contact page is untouched.
- **Admin auth**: none added. `/admin` remains exactly as open as it is today
  (no auth exists anywhere in the admin panel currently — out of scope for
  this feature).
- **Rate limit**: max 2 requests per (email, paper) pair, counting **all**
  statuses (Pending + Approved + Rejected). Enforced client-side only
  (matches the app's existing trust level — all current RLS policies are
  already fully open to the anon key; no DB trigger added).

## Data model

New table `paper_requests`, alongside `papers`/`blog_posts` in
`supabase/seed.sql` (documentation copy) and applied to the live project via
the Supabase MCP:

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

RLS mirrors the existing open-anon-key pattern used by `papers`/`blog_posts`
(no auth exists anywhere in this app yet).

Frontend type (`src/types/paperRequest.ts`), mirroring `src/types/paper.ts`:

```ts
export type RequestStatus = 'Pending' | 'Approved' | 'Rejected'

export type PaperRequest = {
  id: string
  fullName: string
  email: string
  paperId: string
  paperTitle: string   // joined from papers.title
  reason: string
  status: RequestStatus
  createdAt: string
}
```

Row/mapper (`src/services/mappers.ts`), following `PaperRow`/`mapPaperRow`
conventions, joined against `papers(title)`.

## Frontend service — `src/services/paperRequests.ts`

Mirrors `src/services/papers.ts`'s shape:

- `fetchPaperRequests(): Promise<PaperRequest[]>` — selects
  `*, papers(title)`, ordered by `created_at desc`.
- `countRequestsFor(email, paperId): Promise<number>` — used by the modal for
  the 2-request cap.
- `createPaperRequest(input): Promise<PaperRequest>` — inserts a `Pending`
  row.
- `approvePaperRequest(id): Promise<void>` — invokes the
  `approve-paper-request` edge function.
- `rejectPaperRequest(id): Promise<void>` — direct
  `update({ status: 'Rejected' })`.

`src/hooks/usePaperRequests.ts` mirrors `usePapers.ts` (load/error/refetch).

## Request form — `PaperRequestModal.tsx`

- Add a required **Full Name** text field above the email field.
- Remove the `sendPaperRequest` (Web3Forms) call.
- Before submit, call `countRequestsFor(email, paper.id)`. If ≥ 2, show an
  inline error and disable submission (no insert attempted).
- Otherwise call `createPaperRequest({ fullName, email, paperId, reason })`.
- Success panel copy changes to reflect async admin review, e.g. "We'll
  review your request and email you at `{email}` if it's approved."

## Admin — "Access Requests" tab

- `AdminPage.tsx`: add `{ id: 'requests', label: 'Access Requests' }` to the
  `tabs` array; render `<RequestsManager />` for that tab. Same pattern as
  the existing `papers`/`blogs` tabs — no router changes.
- `src/pages/admin/components/RequestsManager.tsx`, following
  `PapersManager.tsx` conventions exactly:
  - Stats bar (reuse the same gap-px/hairline-border pattern): Total,
    Pending, Approved, Rejected counts.
  - Filter pills (All/Pending/Approved/Rejected) as plain buttons with
    active-state styling consistent with the `AdminPage` tab-bar pattern
    (no new dependency).
  - White rounded card (`rounded-2xl border border-navy/10 bg-white
    shadow-sm`) with a `divide-y divide-navy/10` row list.
  - Each row shows: full name, email, requested paper title, formatted date
    (`formatPaperDate`-style helper), and a status badge:
    - `Approved` → `bg-green-50 text-green-700` (existing convention)
    - `Pending` → `bg-amber-50 text-amber-700` (existing convention)
    - `Rejected` → `bg-red-50 text-red-700` (new, extends the same pattern)
  - Row actions, shown only when `status === 'Pending'`:
    - **Approve** — `Button variant="outline"` with a green className
      override (border/text, hover fill), `window.confirm` guard, calls
      `approvePaperRequest` then refetches.
    - **Reject** — `Button variant="ghost"` with `text-red-700
      hover:text-red-800` (identical override to the existing Delete
      button), `window.confirm` guard, calls `rejectPaperRequest` then
      refetches.
  - Loading/error states follow the same inline patterns used elsewhere
    (e.g. `usePapers`'s `isLoading`/`error`).

## Approve workflow — Supabase Edge Function

New function `supabase/functions/approve-paper-request/index.ts`:

1. Receives `{ requestId }`.
2. Loads the request row; if not found or not `Pending`, returns an error
   (idempotency guard — no double-send on repeat clicks/retries).
3. Loads the related `papers` row for `title` and `pdf_url`.
4. Sends an email via the Resend API to the request's `email`:
   - Subject: `Your paper access request has been approved`
   - Body: greets `full_name`, names the paper, includes a button/link to
     `pdf_url`.
5. On successful send, updates `paper_requests.status = 'Approved'`.
6. Returns `{ ok: true }` or a structured error the client surfaces.

Frontend calls this via `supabase.functions.invoke('approve-paper-request',
{ body: { requestId } })` from `paperRequests.ts`. Reject does not need a
function — it's a plain client-side status update.

**Operational prerequisite (manual, one-time):** a Resend account, a
verified/sending-capable "from" address, and the `RESEND_API_KEY` secret set
on the Supabase project (`supabase secrets set RESEND_API_KEY=...` or via
Dashboard → Edge Functions → Secrets). Not available through the Supabase
MCP tools, so this step needs to be done by the user outside this session.

## Explicitly out of scope

- Admin authentication for `/admin`.
- Migrating restricted-paper storage to a private bucket / signed URLs.
- Any DB-level (trigger-based) enforcement of the 2-request cap.
- Changes to the Contact page or its Web3Forms integration.
