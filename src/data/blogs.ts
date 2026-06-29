import type { BlogPost } from '../types/blog'
import { blogImages } from './blogAssets'

export const blogCategories = [
  'All',
  'Managerial Cybernetics',
  'Systems Thinking',
  'Corporate Strategy',
  'Research',
] as const

export const blogPosts: BlogPost[] = [
  {
    slug: 'the-cybernetic-organization',
    title: 'The Cybernetic Organization',
    excerpt:
      'The teachings of Stafford Beer remain more relevant today than ever. In this article, we explore how Managerial Cybernetics can help modern firms move beyond rigid hierarchies to create self-regulating systems that thrive on complexity rather than being crushed by it.',
    body: [
      'The teachings of Stafford Beer remain more relevant today than ever. As organizations face accelerating change, the traditional command-and-control model often fails to keep pace with the variety of challenges in the environment.',
      'Managerial Cybernetics offers a different lens: instead of adding more layers of management, we design systems that can sense, decide, and adapt. The viable system model gives leaders a practical framework for diagnosing organizational health and identifying where information flows break down.',
      'Modern firms that embrace cybernetic principles tend to decentralize decision rights while strengthening accountability loops. Teams closer to the customer gain autonomy, but remain connected through clear channels of communication and measurable performance indicators.',
      'The goal is not chaos—it is controlled variety. When an organization can match the complexity of its environment without collapsing under its own bureaucracy, it becomes genuinely resilient. That is the promise of the cybernetic organization.',
    ],
    author: 'Dr. Paul A. Stokes',
    readTime: '5 min read',
    date: '2026-02-14',
    category: 'Managerial Cybernetics',
    image: blogImages.cybernetic1,
  },
  {
    slug: 'systems-thinking-for-strategic-leaders',
    title: 'Systems Thinking for Strategic Leaders',
    excerpt:
      'Strategic leadership is less about isolated decisions and more about understanding how parts of an organization interact. Systems thinking helps executives see patterns, delays, and feedback loops before they become crises.',
    body: [
      'Strategic leadership is less about isolated decisions and more about understanding how parts of an organization interact. Every policy, hire, and investment sends ripples through the system—often in ways that are invisible until months later.',
      'Systems thinking trains leaders to map those relationships explicitly. Instead of asking only what went wrong last quarter, we ask what structures made that outcome likely. This shift from blame to design is foundational for sustainable improvement.',
      'One practical starting point is identifying reinforcing and balancing loops within the business. Growth can accelerate itself through network effects, but unchecked expansion can also strain culture, quality, and cash flow.',
      'Leaders who think in systems build institutions that learn. They invest in feedback mechanisms, cross-functional dialogue, and the humility to revise strategy when the environment changes.',
    ],
    author: 'Dr. Paul A. Stokes',
    readTime: '6 min read',
    date: '2026-01-28',
    category: 'Systems Thinking',
    image: blogImages.cybernetic2,
  },
  {
    slug: 'viability-over-efficiency',
    title: 'Why Viability Matters More Than Efficiency',
    excerpt:
      'Efficiency optimizes what already exists. Viability asks whether the organization can survive and adapt in the first place. For institutions navigating uncertainty, that distinction is not academic—it is existential.',
    body: [
      'Efficiency has dominated management discourse for decades. Lean processes, cost reduction, and throughput metrics all have their place—but they assume the underlying system is already fit for purpose.',
      'Viability takes a wider view. Can the organization absorb shocks? Can it sense environmental change early enough to respond? Can its subsystems coordinate without constant intervention from the center?',
      'In consultancy work across public and private sectors, I have seen highly efficient organizations fail because they optimized the wrong things. They streamlined operations while their strategic environment shifted beneath them.',
      'Viability requires investment in intelligence, cohesion, and autonomy—the three pillars of Beer\'s viable system model. Efficiency follows viability; rarely the other way around.',
    ],
    author: 'Dr. Paul A. Stokes',
    readTime: '4 min read',
    date: '2026-01-10',
    category: 'Corporate Strategy',
    image: blogImages.heroBg,
  },
  {
    slug: 'manpower-planning-in-complex-institutions',
    title: 'Manpower Planning in Complex Institutions',
    excerpt:
      'Workforce planning in large institutions is not a spreadsheet exercise. It is a systemic challenge that must account for skills, culture, regulation, and long-term strategic intent.',
    body: [
      'Manpower planning is often reduced to headcount forecasts and vacancy lists. In complex institutions—universities, government bodies, multinational NGOs—the reality is far more intricate.',
      'Effective planning begins with clarity on the institution\'s core mission and the capabilities required to deliver it. From there, leaders must map current capacity, projected demand, and the lead times needed to develop critical skills.',
      'Cybernetic approaches emphasize recursions: each unit should have the autonomy to plan its own resources while remaining aligned with enterprise-level constraints and goals. This prevents both micromanagement and dangerous silos.',
      'When manpower planning is treated as a living system rather than an annual ritual, institutions build workforces that can evolve with their environment instead of perpetually playing catch-up.',
    ],
    author: 'Dr. Paul A. Stokes',
    readTime: '7 min read',
    date: '2025-12-05',
    category: 'Research',
    image: blogImages.aboutPortrait,
  },
]

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function formatBlogDate(date: string) {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
