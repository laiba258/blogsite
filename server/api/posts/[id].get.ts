import { db } from '../../utils/db'
import { posts } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) return { error: 'No ID provided' }

  const post = await db.query.posts.findFirst({
    where: eq(posts.id, id)
  })

  return post
})
