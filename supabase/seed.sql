-- ============================================================
-- Schema + seed for paul-scholar-website
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- ── Tables ──────────────────────────────────────────────────

create table if not exists blog_posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  excerpt     text not null,
  body        jsonb not null,
  author      text not null,
  read_time   text not null,
  date        date not null,
  category    text not null,
  image_key   text not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists papers (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null,
  excerpt             text,
  date                date not null,
  category            text not null,
  access              text not null default 'Public',
  tags                text[],
  file_size           text,
  thumbnail_url       text,
  pdf_url             text,
  thumbnail_file_name text,
  pdf_file_name       text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ── RLS (temporary — open write policies until auth is added) ─
-- WARNING: these allow anyone with the anon key to write.
-- Tighten to authenticated-only writes before real production launch.

alter table blog_posts enable row level security;
alter table papers enable row level security;

-- Public read
create policy "public can read blog_posts" on blog_posts for select using (true);
create policy "public can read papers"     on papers     for select using (true);

-- Open write via anon key (dev / pre-auth phase only)
create policy "anon can insert blog_posts" on blog_posts for insert with check (true);
create policy "anon can update blog_posts" on blog_posts for update using (true);
create policy "anon can delete blog_posts" on blog_posts for delete using (true);

create policy "anon can insert papers" on papers for insert with check (true);
create policy "anon can update papers" on papers for update using (true);
create policy "anon can delete papers" on papers for delete using (true);

-- ── Storage buckets ──────────────────────────────────────────
-- Create these manually in Supabase Dashboard → Storage:
--   • paper-pdfs       (public)
--   • paper-thumbnails (public)

-- ── Seed: blog posts ────────────────────────────────────────

insert into blog_posts (slug, title, excerpt, body, author, read_time, date, category, image_key)
values
(
  'the-cybernetic-organization',
  'The Cybernetic Organization',
  'The teachings of Stafford Beer remain more relevant today than ever. In this article, we explore how Managerial Cybernetics can help modern firms move beyond rigid hierarchies to create self-regulating systems that thrive on complexity rather than being crushed by it.',
  '["The teachings of Stafford Beer remain more relevant today than ever. As organizations face accelerating change, the traditional command-and-control model often fails to keep pace with the variety of challenges in the environment.", "Managerial Cybernetics offers a different lens: instead of adding more layers of management, we design systems that can sense, decide, and adapt. The viable system model gives leaders a practical framework for diagnosing organizational health and identifying where information flows break down.", "Modern firms that embrace cybernetic principles tend to decentralize decision rights while strengthening accountability loops. Teams closer to the customer gain autonomy, but remain connected through clear channels of communication and measurable performance indicators.", "The goal is not chaos—it is controlled variety. When an organization can match the complexity of its environment without collapsing under its own bureaucracy, it becomes genuinely resilient. That is the promise of the cybernetic organization."]',
  'Dr. Paul A. Stokes',
  '5 min read',
  '2026-02-14',
  'Managerial Cybernetics',
  'cybernetic1'
),
(
  'systems-thinking-for-strategic-leaders',
  'Systems Thinking for Strategic Leaders',
  'Strategic leadership is less about isolated decisions and more about understanding how parts of an organization interact. Systems thinking helps executives see patterns, delays, and feedback loops before they become crises.',
  '["Strategic leadership is less about isolated decisions and more about understanding how parts of an organization interact. Every policy, hire, and investment sends ripples through the system—often in ways that are invisible until months later.", "Systems thinking trains leaders to map those relationships explicitly. Instead of asking only what went wrong last quarter, we ask what structures made that outcome likely. This shift from blame to design is foundational for sustainable improvement.", "One practical starting point is identifying reinforcing and balancing loops within the business. Growth can accelerate itself through network effects, but unchecked expansion can also strain culture, quality, and cash flow.", "Leaders who think in systems build institutions that learn. They invest in feedback mechanisms, cross-functional dialogue, and the humility to revise strategy when the environment changes."]',
  'Dr. Paul A. Stokes',
  '6 min read',
  '2026-01-28',
  'Systems Thinking',
  'cybernetic2'
),
(
  'viability-over-efficiency',
  'Why Viability Matters More Than Efficiency',
  'Efficiency optimizes what already exists. Viability asks whether the organization can survive and adapt in the first place. For institutions navigating uncertainty, that distinction is not academic—it is existential.',
  '["Efficiency has dominated management discourse for decades. Lean processes, cost reduction, and throughput metrics all have their place—but they assume the underlying system is already fit for purpose.", "Viability takes a wider view. Can the organization absorb shocks? Can it sense environmental change early enough to respond? Can its subsystems coordinate without constant intervention from the center?", "In consultancy work across public and private sectors, I have seen highly efficient organizations fail because they optimized the wrong things. They streamlined operations while their strategic environment shifted beneath them.", "Viability requires investment in intelligence, cohesion, and autonomy—the three pillars of Beer''s viable system model. Efficiency follows viability; rarely the other way around."]',
  'Dr. Paul A. Stokes',
  '4 min read',
  '2026-01-10',
  'Corporate Strategy',
  'heroBg'
),
(
  'manpower-planning-in-complex-institutions',
  'Manpower Planning in Complex Institutions',
  'Workforce planning in large institutions is not a spreadsheet exercise. It is a systemic challenge that must account for skills, culture, regulation, and long-term strategic intent.',
  '["Manpower planning is often reduced to headcount forecasts and vacancy lists. In complex institutions—universities, government bodies, multinational NGOs—the reality is far more intricate.", "Effective planning begins with clarity on the institution''s core mission and the capabilities required to deliver it. From there, leaders must map current capacity, projected demand, and the lead times needed to develop critical skills.", "Cybernetic approaches emphasize recursions: each unit should have the autonomy to plan its own resources while remaining aligned with enterprise-level constraints and goals. This prevents both micromanagement and dangerous silos.", "When manpower planning is treated as a living system rather than an annual ritual, institutions build workforces that can evolve with their environment instead of perpetually playing catch-up."]',
  'Dr. Paul A. Stokes',
  '7 min read',
  '2025-12-05',
  'Research',
  'aboutPortrait'
)
on conflict (slug) do nothing;

-- ── Seed: papers ────────────────────────────────────────────

insert into papers (title, excerpt, date, category, access, tags, file_size)
values
(
  'Machine Learning Applications in Climate Science:',
  'Explores how machine learning models are being applied to climate forecasting, emissions analysis, and environmental risk assessment.',
  '2026-02-28', 'Research Paper', 'Public',
  array['Machine Learning', 'Climate Science'], '2.4 MB'
),
(
  'Quantum Computing and Its Impact on Cryptographic',
  'Reviews the implications of quantum computing advances for modern cryptographic systems and institutional data security.',
  '2026-02-28', 'Journal Article', 'Public',
  array['Quantum Computing', 'Security'], '1.8 MB'
),
(
  'Neural Networks for Natural Language Processing: A',
  'A survey of neural network architectures used in natural language processing, with emphasis on transformer-based systems.',
  '2026-02-10', 'Conference Paper', 'Restricted',
  array['Neural Networks', 'NLP'], '3.1 MB'
),
(
  'Sustainable Energy Solutions: Current State and Fu',
  'Summarizes current sustainable energy technologies and policy frameworks shaping the transition to low-carbon systems.',
  '2026-01-22', 'Report', 'Public',
  array['Energy', 'Sustainability'], '2.0 MB'
),
(
  'Behavioral Economics and Decision Making Under Unc',
  'Examines how behavioral economics informs decision-making under uncertainty in complex organizational environments.',
  '2026-01-08', 'Research Paper', 'Public',
  array['Behavioral Economics', 'Decision Making'], '1.5 MB'
),
(
  'Data Privacy in the Age of Big Data: Challenges an',
  'Discusses privacy challenges created by large-scale data collection and the governance models needed to address them.',
  '2025-12-15', 'Journal Article', 'Restricted',
  array['Data Privacy', 'Big Data'], '2.2 MB'
),
(
  'Advances in Biomedical Engineering: From Theory to',
  'Tracks recent advances in biomedical engineering from theoretical foundations to applied clinical and research outcomes.',
  '2025-11-30', 'Report', 'Public',
  array['Biomedical Engineering', 'Healthcare'], '2.7 MB'
),
(
  'Social Media Analytics: Understanding User Behavio',
  'Analyzes methods for understanding user behavior through social media analytics and digital engagement patterns.',
  '2025-11-12', 'Conference Paper', 'Public',
  array['Social Media', 'Analytics'], '1.9 MB'
)
on conflict do nothing;
