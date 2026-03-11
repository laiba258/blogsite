import { db } from '../../../utils/db'
import { posts } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((session.user as any)?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) return { error: 'No ID' }

  await db.delete(posts).where(eq(posts.id, id))
  return { message: 'Post deleted successfully' }
})