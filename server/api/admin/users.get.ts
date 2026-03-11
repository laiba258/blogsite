import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((session.user as any)?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Unauthorized' })
  }

  return await db.query.users.findMany({
    columns: {
      password: false
    }
  })
})