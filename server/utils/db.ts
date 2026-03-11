import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '../database/schema'

// Use environment variables for production (Turso) or local file for development
const client = createClient({
  url: process.env.DATABASE_URL || 'file:.data/db/sqlite.db',
  authToken: process.env.DATABASE_AUTH_TOKEN
})

export const db = drizzle(client, { schema })