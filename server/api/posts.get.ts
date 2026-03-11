// server/api/posts.get.ts
import { db } from '../utils/db'

export default defineEventHandler(async () => {
  return await db.query.posts.findMany()
})