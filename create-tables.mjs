import { createClient } from '@libsql/client';
import { config } from 'dotenv';

config();

console.log('🚀 Creating tables in Turso database...\n');

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
});

const createPostsTable = `
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  meta_title TEXT,
  meta_desc TEXT,
  keywords TEXT,
  canonical_url TEXT,
  is_published INTEGER DEFAULT 1
);
`;

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user'
);
`;

try {
  console.log('📋 Creating posts table...');
  await client.execute(createPostsTable);
  console.log('✅ Posts table created');
  
  console.log('\n📋 Creating users table...');
  await client.execute(createUsersTable);
  console.log('✅ Users table created');
  
  console.log('\n📊 Verifying tables...');
  const tables = await client.execute(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name;
  `);
  
  console.log('\nTables in database:');
  tables.rows.forEach(row => {
    console.log('  ✓', row.name);
  });
  
  console.log('\n✅ All done! Tables are ready.');
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
