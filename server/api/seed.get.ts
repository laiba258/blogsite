// server/api/seed.get.ts
import { db } from '../utils/db'
import { posts } from '../database/schema'

export default defineEventHandler(async (event) => {
  // Purana data saaf karne ke liye (Optional)
  // await db.delete(posts) 

  const dummyPosts = [
    {
      title: 'The Future of Nuxt and Web Development',
      description: 'Exploring how Nuxt 4 is changing the game...',
      content: 'Full content goes here...',
      category: 'Tech',
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1000&auto=format&fit=crop',
      date: 'March 10, 2026',
      readTime: '5 min'
    },
    {
      title: 'Aesthetic Minimalism in UI Design',
      description: 'Why less is more in digital experiences...',
      content: 'Full content goes here...',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop',
      date: 'March 08, 2026',
      readTime: '3 min'
    }
  ]

  await db.insert(posts).values(dummyPosts)
  return { message: 'Database Seeded Successfully!' }
})