import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '../database/schema'

// For local development, use file-based SQLite
const client = createClient({
  url: 'file:.data/db/sqlite.db'
})

export const db = drizzle(client, { schema })