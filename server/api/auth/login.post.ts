import { db } from '../../utils/db'
import { users } from '../../database/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 1. User ko email se dhoondo
  const user = await db.query.users.findFirst({
    where: eq(users.email, body.email)
  })

  if (!user) {
    throw createError({ statusCode: 401, message: 'User nahi mila!' })
  }

  // 2. Password match karo (Bcrypt ke zariye)
  const isPasswordCorrect = await bcrypt.compare(body.password, user.password)

  if (!isPasswordCorrect) {
    throw createError({ statusCode: 401, message: 'Ghalat Password!' })
  }

  // 3. Session Set karo (Nuxt Auth Utils)
  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  })

  return { message: 'Login Success!', role: user.role }
})