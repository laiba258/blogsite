import { createClient } from '@libsql/client'
import 'dotenv/config'

const db = createClient({
  url: process.env.DATABASE_URL || 'file:./.data/db/sqlite.db',
  authToken: process.env.DATABASE_AUTH_TOKEN,
})

async function addResetColumns() {
  try {
    console.log('Adding reset_token and reset_token_expiry columns to users table...')
    
    // Add reset_token column
    await db.execute(`
      ALTER TABLE users ADD COLUMN reset_token TEXT;
    `)
    console.log('✓ Added reset_token column')
    
    // Add reset_token_expiry column
    await db.execute(`
      ALTER TABLE users ADD COLUMN reset_token_expiry TEXT;
    `)
    console.log('✓ Added reset_token_expiry column')
    
    console.log('\n✅ Successfully added reset columns to users table!')
  } catch (error) {
    if (error.message.includes('duplicate column name')) {
      console.log('✓ Columns already exist, skipping...')
    } else {
      console.error('❌ Error:', error.message)
    }
  }
}

addResetColumns()
