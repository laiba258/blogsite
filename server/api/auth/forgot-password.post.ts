import { db } from '../../utils/db'
import { users } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = await db.query.users.findFirst({
    where: eq(users.email, body.email)
  })

  if (!user) {
    // Don't reveal if email exists for security
    return { 
      success: true, 
      message: 'If an account exists with this email, you will receive a password reset link.' 
    }
  }

  // Generate reset token
  const resetToken = crypto.randomUUID()
  const resetTokenExpiry = new Date(Date.now() + 3600000).toISOString() // 1 hour

  // Save token to database
  await db.update(users)
    .set({ 
      resetToken, 
      resetTokenExpiry 
    })
    .where(eq(users.id, user.id))

  // In production, send email here
  // For now, log to console (development only)
  console.log('\n=== PASSWORD RESET REQUEST ===')
  console.log('Email:', user.email)
  console.log('Reset Link:', `http://localhost:3000/reset-password?token=${resetToken}`)
  console.log('Token expires in 1 hour')
  console.log('=============================\n')

  return { 
    success: true, 
    message: 'If an account exists with this email, you will receive a password reset link.',
    // Only in development
    ...(process.env.NODE_ENV === 'development' && { 
      resetLink: `http://localhost:3000/reset-password?token=${resetToken}` 
    })
  }
})
