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

  const body = await readBody(event)
  
  if (!body.id || !body.title || !body.content) {
    throw createError({ 
      statusCode: 400, 
      message: 'Page ID, title, and content are required' 
    })
  }

  await db.insert(staticPages)
    .values({
      id: body.id,
      title: body.title,
      content: body.content,
      metaTitle: body.metaTitle || body.title,
      metaDescription: body.metaDescription || '',
      updatedAt: new Date().toISOString()
    })
    .onConflictDoUpdate({
      target: staticPages.id,
      set: {
        title: body.title,
        content: body.content,
        metaTitle: body.metaTitle || body.title,
        metaDescription: body.metaDescription || '',
        updatedAt: new Date().toISOString()
      }
    })

  return {
    success: true,
    message: 'Page updated successfully'
  }
})
