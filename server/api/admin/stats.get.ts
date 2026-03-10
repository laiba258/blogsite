import { db } from '../../utils/db'
import { posts, users } from '../../database/schema'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Admin Check
  const session = await getUserSession(event)
  if (session.user?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Unauthorized' })
  }

  const postsCount = await db.select({ count: sql<number>`count(*)` }).from(posts)
  const usersCount = await db.select({ count: sql<number>`count(*)` }).from(users)

  return {
    totalPosts: postsCount[0].count,
    totalUsers: usersCount[0].count,
    lastUpdated: new Date().toLocaleDateString()
  }
})