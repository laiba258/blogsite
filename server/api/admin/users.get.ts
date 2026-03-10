import { db } from '../../utils/db'
import { users } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (session.user?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Unauthorized' })
  }

  return await db.query.users.findMany({
    columns: {
      password: false
    }
  })
})