import { db } from '../../utils/db'
import { users } from '../../database/schema'
import bcrypt from 'bcrypt'

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
    name: body.name,
    email: body.email,
    password: hashedPassword, // Hashed password save ho raha hai
    role: role
  }).returning()

  return { 
    message: 'Account created successfully!', 
    user: { email: newUser[0].email, name: newUser[0].name, role: newUser[0].role } 
  }
})