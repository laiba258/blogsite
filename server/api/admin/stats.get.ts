import { db } from '../../utils/db'
import { posts, users } from '../../database/schema'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Admin Check
  const session = await getUserSession(event)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((session.user as any)?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Unauthorized' })
  }

  const postsCount = await db.select({ count: sql<number>`count(*)` }).from(posts)
  const usersCount = await db.select({ count: sql<number>`count(*)` }).from(users)

  return {
    totalPosts: postsCount[0]?.count || 0,
    totalUsers: usersCount[0]?.count || 0,
    lastUpdated: new Date().toLocaleDateString()
  }
})