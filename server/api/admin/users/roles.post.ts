import { db } from '../../../utils/db'
import { users } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((session.user as any)?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Unauthorized' })
  }

  const body = await readBody(event) 
  
  await db.update(users)
    .set({ role: body.newRole })
    .where(eq(users.id, body.userId))

  return { message: 'User role updated!' }
})