import { db } from '../../utils/db'
import { posts } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Security Check: Sirf admin hi ye kam kar sake
  const session = await getUserSession(event)
  if (session.user?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Unauthorized' })
  }

  const body = await readBody(event)
  const { id, ...postData } = body

  if (id) {
    // Update existing post
    return await db.update(posts).set(postData).where(eq(posts.id, id))
  } else {
    // Create new post
    return await db.insert(posts).values({
      ...postData,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2026' })
    })
  }
})