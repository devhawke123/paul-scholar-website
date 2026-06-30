import testimonialPortrait from '../assets/homepage/prof-jane-smith.jpg'
import drPaulPortrait from '../assets/homepage/dr-paul.png'
import blogCybernetic1 from '../assets/homepage/the-cybernetic1.jpg'
import blogCybernetic2 from '../assets/homepage/the-cybernetic2.png'

export const testimonialsContent = {
  badge: 'Testimonials',
  heading: 'What People Say About Dr. Paul A. Stokes',
  description:
    'Get access to professional training that helps you gain skills employers value. From beginner to advanced, our programs are built for learners who want results.',
  items: [
    {
      quote:
        'Dr. Stokes brings unparalleled insight into organizational systems. His guidance shaped my research and understanding of complex institutions.',
      name: 'Professor Jane Smith',
      role: 'University of Leeds',
      image: testimonialPortrait,
      imageAlt: 'Professor Jane Smith',
      rating: 5,
    },
    {
      quote:
        'Working with Dr. Stokes transformed how our policy team handles uncertainty. His frameworks are practical, focused, and immediately useful.',
      name: 'Michael Turner',
      role: 'Policy Advisor, Westminster Group',
      image: drPaulPortrait,
      imageAlt: 'Michael Turner',
      rating: 5,
    },
    {
      quote:
        'His systems approach gave our leadership team a shared language for complexity. We now make better decisions across departments.',
      name: 'Dr. Amelia Reed',
      role: 'Director of Strategy, Northbridge Institute',
      image: blogCybernetic1,
      imageAlt: 'Dr. Amelia Reed',
      rating: 5,
    },
    {
      quote:
        'Dr. Stokes combines academic rigor with real-world relevance. Every session sharpened how we think about organizational change.',
      name: 'Daniel Cho',
      role: 'Senior Program Lead, Global Learning',
      image: blogCybernetic2,
      imageAlt: 'Daniel Cho',
      rating: 5,
    },
  ],
} as const

export const featuredTestimonial = testimonialsContent.items[0]
