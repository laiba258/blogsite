import { db } from '../../utils/db'
import { users } from '../../database/schema'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // 1. Check karo user pehle se toh nahi hai
  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, body.email)
  })

  if (existingUser) {
    throw createError({ statusCode: 400, message: 'Email pehle se register hai!' })
  }

  // 2. Password ko Hash karo (Taake DB mein asli password nazar na aaye)
  const hashedPassword = await bcrypt.hash(body.password, 10)

  // 3. Pehla user Admin hoga, baaki sab normal users
  const allUsers = await db.select().from(users)
  const role = allUsers.length === 0 ? 'admin' : 'user'

  const newUser = await db.insert(users).values({
    id: uuidv4(),
    name: body.name,
    email: body.email,
    password: hashedPassword, // Hashed password save ho raha hai
    role: role
  }).returning()

  const user = newUser[0]
  if (!user) {
    throw createError({ statusCode: 500, message: 'Failed to create user' })
  }

  return { 
    message: 'Account created successfully!', 
    user: { email: user.email, name: user.name, role: user.role } 
  }
})