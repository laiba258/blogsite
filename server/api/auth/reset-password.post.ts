import { db } from '../../utils/db'
import { users } from '../../database/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.token || !body.password) {
    throw createError({ 
      statusCode: 400, 
      message: 'Token and new password are required' 
    })
  }

  // Find user with valid token
  const user = await db.query.users.findFirst({
    where: eq(users.resetToken, body.token)
  })

  if (!user) {
    throw createError({ 
      statusCode: 400, 
      message: 'Invalid or expired reset token' 
    })
  }

  // Check if token is expired
  if (user.resetTokenExpiry && new Date(user.resetTokenExpiry) < new Date()) {
    throw createError({ 
      statusCode: 400, 
      message: 'Reset token has expired. Please request a new one.' 
    })
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(body.password, 10)

  // Update password and clear reset token
  await db.update(users)
    .set({ 
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    })
    .where(eq(users.id, user.id))

  return { 
    success: true, 
    message: 'Password reset successfully! You can now login with your new password.' 
  }
})
