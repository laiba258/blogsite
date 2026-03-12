import { db } from '../../utils/db'
import { staticPages } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Admin authentication check
  const session = await getUserSession(event)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((session.user as any)?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Unauthorized' })
  }

  const query = getQuery(event)
  const pageId = query.id

  if (pageId) {
    const page = await db.query.staticPages.findFirst({
      where: eq(staticPages.id, pageId as string)
    })
    return page
  }

  const allPages = await db.select().from(staticPages)
  return allPages
})
