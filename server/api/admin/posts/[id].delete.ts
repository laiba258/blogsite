import { db } from '../../../utils/db'
import { posts } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (session.user?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) return { error: 'No ID' }

  await db.delete(posts).where(eq(posts.id, parseInt(id)))
  return { message: 'Post deleted successfully' }
})