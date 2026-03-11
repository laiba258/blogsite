import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { config } from 'dotenv';
import { readFileSync } from 'fs';

// Load .env
config();

console.log('🚀 Pushing schema to Turso database...\n');

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
});

const db = drizzle(client);

try {
  // Read the latest migration file
  const migration = readFileSync('./server/database/migrations/0002_equal_hedge_knight.sql', 'utf-8');
  
  console.log('📋 Executing migration...\n');
  
  // Split by statement separator and execute each
  const statements = migration
    .split('-->')
    .map(s => s.trim())
    .filter(s => s && !s.startsWith('statement-breakpoint'));
  
  for (const statement of statements) {
    if (statement) {
      console.log('Executing:', statement.substring(0, 50) + '...');
      await client.execute(statement);
    }
  }
  
  console.log('\n✅ Schema pushed successfully!');
  console.log('\n📊 Verifying tables...');
  
  const tables = await client.execute(`
    SELECT name FROM sqlite_master 
    WHERE type='table' 
    ORDER BY name;
  `);
  
  console.log('\nTables created:');
  tables.rows.forEach(row => {
    console.log('  ✓', row.name);
  });
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
