import type { BlogImageKey, BlogInput, BlogPost, BlogPostCategory } from '../types/blog'

const STORAGE_KEY = 'paul-scholar-blogs'
const BLOGS_UPDATED_EVENT = 'blogs-updated'

const seedPosts: Omit<BlogPost, 'id'>[] = [
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
    imageKey: 'cybernetic1',
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
    imageKey: 'cybernetic2',
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
      "Viability requires investment in intelligence, cohesion, and autonomy—the three pillars of Beer's viable system model. Efficiency follows viability; rarely the other way around.",
    ],
    author: 'Dr. Paul A. Stokes',
    readTime: '4 min read',
    date: '2026-01-10',
    category: 'Corporate Strategy',
    imageKey: 'heroBg',
  },
  {
    slug: 'manpower-planning-in-complex-institutions',
    title: 'Manpower Planning in Complex Institutions',
    excerpt:
      'Workforce planning in large institutions is not a spreadsheet exercise. It is a systemic challenge that must account for skills, culture, regulation, and long-term strategic intent.',
    body: [
      'Manpower planning is often reduced to headcount forecasts and vacancy lists. In complex institutions—universities, government bodies, multinational NGOs—the reality is far more intricate.',
      "Effective planning begins with clarity on the institution's core mission and the capabilities required to deliver it. From there, leaders must map current capacity, projected demand, and the lead times needed to develop critical skills.",
      'Cybernetic approaches emphasize recursions: each unit should have the autonomy to plan its own resources while remaining aligned with enterprise-level constraints and goals. This prevents both micromanagement and dangerous silos.',
      'When manpower planning is treated as a living system rather than an annual ritual, institutions build workforces that can evolve with their environment instead of perpetually playing catch-up.',
    ],
    author: 'Dr. Paul A. Stokes',
    readTime: '7 min read',
    date: '2025-12-05',
    category: 'Research',
    imageKey: 'aboutPortrait',
  },
]

function seedBlogs(): BlogPost[] {
  return seedPosts.map((post, index) => ({
    id: `blog-${index + 1}`,
    ...post,
  }))
}

function notifyBlogsUpdated() {
  window.dispatchEvent(new Event(BLOGS_UPDATED_EVENT))
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function uniqueSlug(base: string, blogs: BlogPost[], excludeId?: string): string {
  let slug = base || 'post'
  let counter = 1
  while (blogs.some((blog) => blog.slug === slug && blog.id !== excludeId)) {
    slug = `${base}-${counter}`
    counter += 1
  }
  return slug
}

export function loadBlogs(): BlogPost[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    const seeded = seedBlogs()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
    return seeded
  }

  try {
    return JSON.parse(stored) as BlogPost[]
  } catch {
    const seeded = seedBlogs()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
    return seeded
  }
}

function saveBlogs(blogs: BlogPost[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs))
  notifyBlogsUpdated()
}

export function addBlog(input: BlogInput): BlogPost {
  const blogs = loadBlogs()
  const baseSlug = slugifyTitle(input.slug || input.title)
  const blog: BlogPost = {
    id: crypto.randomUUID(),
    ...input,
    slug: uniqueSlug(baseSlug, blogs),
    category: input.category as BlogPostCategory,
    imageKey: input.imageKey as BlogImageKey,
  }
  saveBlogs([blog, ...blogs])
  return blog
}

export function updateBlog(id: string, input: BlogInput): BlogPost | null {
  const blogs = loadBlogs()
  const index = blogs.findIndex((blog) => blog.id === id)
  if (index === -1) return null

  const baseSlug = slugifyTitle(input.slug || input.title)
  const updated: BlogPost = {
    id,
    ...input,
    slug: uniqueSlug(baseSlug, blogs, id),
    category: input.category as BlogPostCategory,
    imageKey: input.imageKey as BlogImageKey,
  }
  const next = [...blogs]
  next[index] = updated
  saveBlogs(next)
  return updated
}

export function deleteBlog(id: string): boolean {
  const blogs = loadBlogs()
  const next = blogs.filter((blog) => blog.id !== id)
  if (next.length === blogs.length) return false
  saveBlogs(next)
  return true
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return loadBlogs().find((post) => post.slug === slug)
}

export function subscribeToBlogs(callback: () => void) {
  const handler = () => callback()
  window.addEventListener(BLOGS_UPDATED_EVENT, handler)
  return () => window.removeEventListener(BLOGS_UPDATED_EVENT, handler)
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
