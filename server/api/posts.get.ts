import { db } from '../utils/db'
import { posts } from '../database/schema'

export default defineEventHandler(async () => {
  const allPosts = await db.select().from(posts)
  return allPosts
})
