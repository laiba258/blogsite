// server/api/seed.get.ts
import { db } from '../utils/db'
import { posts } from '../database/schema'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async () => {

  const dummyPosts = [
    {
      title: 'The Future of Nuxt and Web Development',
      description: 'Exploring how Nuxt 4 is changing the game...',
      content: 'Full content goes here...',
      category: 'Tech',
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1000&auto=format&fit=crop',
      date: 'March 10, 2026',
      readTime: '5 min',
      isPublished: 1
    },
    {
      title: 'Aesthetic Minimalism in UI Design',
      description: 'Why less is more in digital experiences...',
      content: 'Full content goes here...',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop',
      date: 'March 08, 2026',
      readTime: '3 min',
      isPublished: 1
    },
    {
      title: 'Nuxt Performance Optimization',
      description: 'Tips to make Nuxt apps blazing fast...',
      content: 'Full content goes here...',
      category: 'Tech',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
      date: 'March 05, 2026',
      readTime: '4 min',
      isPublished: 1
    },
    {
      title: 'Modern UI Trends',
      description: 'Top UI trends designers follow in 2026...',
      content: 'Full content goes here...',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1000&auto=format&fit=crop',
      date: 'March 01, 2026',
      readTime: '6 min',
      isPublished: 1
    }
  ]

  for (const post of dummyPosts) {
    await db.insert(posts).values({
      id: uuidv4(),
      ...post
    })
  }

  return { message: 'Database Seeded Successfully!' }
})