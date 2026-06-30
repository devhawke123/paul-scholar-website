import type { PaperCategory } from '../types/paper'

type SeedDocument = {
  title: string
  date: string
  category: PaperCategory
  access: 'Public' | 'Restricted'
  excerpt: string
  tags: string[]
  fileSize: string
}

export const seedDocuments: SeedDocument[] = [
  {
    title: 'Machine Learning Applications in Climate Science:',
    date: 'February 28, 2026',
    category: 'Research Paper',
    access: 'Public',
    excerpt:
      'Explores how machine learning models are being applied to climate forecasting, emissions analysis, and environmental risk assessment.',
    tags: ['Machine Learning', 'Climate Science'],
    fileSize: '2.4 MB',
  },
  {
    title: 'Quantum Computing and Its Impact on Cryptographic',
    date: 'February 28, 2026',
    category: 'Journal Article',
    access: 'Public',
    excerpt:
      'Reviews the implications of quantum computing advances for modern cryptographic systems and institutional data security.',
    tags: ['Quantum Computing', 'Security'],
    fileSize: '1.8 MB',
  },
  {
    title: 'Neural Networks for Natural Language Processing: A',
    date: 'February 10, 2026',
    category: 'Conference Paper',
    access: 'Restricted',
    excerpt:
      'A survey of neural network architectures used in natural language processing, with emphasis on transformer-based systems.',
    tags: ['Neural Networks', 'NLP'],
    fileSize: '3.1 MB',
  },
  {
    title: 'Sustainable Energy Solutions: Current State and Fu',
    date: 'January 22, 2026',
    category: 'Report',
    access: 'Public',
    excerpt:
      'Summarizes current sustainable energy technologies and policy frameworks shaping the transition to low-carbon systems.',
    tags: ['Energy', 'Sustainability'],
    fileSize: '2.0 MB',
  },
  {
    title: 'Behavioral Economics and Decision Making Under Unc',
    date: 'January 8, 2026',
    category: 'Research Paper',
    access: 'Public',
    excerpt:
      'Examines how behavioral economics informs decision-making under uncertainty in complex organizational environments.',
    tags: ['Behavioral Economics', 'Decision Making'],
    fileSize: '1.5 MB',
  },
  {
    title: 'Data Privacy in the Age of Big Data: Challenges an',
    date: 'December 15, 2025',
    category: 'Journal Article',
    access: 'Restricted',
    excerpt:
      'Discusses privacy challenges created by large-scale data collection and the governance models needed to address them.',
    tags: ['Data Privacy', 'Big Data'],
    fileSize: '2.2 MB',
  },
  {
    title: 'Advances in Biomedical Engineering: From Theory to',
    date: 'November 30, 2025',
    category: 'Report',
    access: 'Public',
    excerpt:
      'Tracks recent advances in biomedical engineering from theoretical foundations to applied clinical and research outcomes.',
    tags: ['Biomedical Engineering', 'Healthcare'],
    fileSize: '2.7 MB',
  },
  {
    title: 'Social Media Analytics: Understanding User Behavio',
    date: 'November 12, 2025',
    category: 'Conference Paper',
    access: 'Public',
    excerpt:
      'Analyzes methods for understanding user behavior through social media analytics and digital engagement patterns.',
    tags: ['Social Media', 'Analytics'],
    fileSize: '1.9 MB',
  },
]
