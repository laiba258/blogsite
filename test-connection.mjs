import { createClient } from '@libsql/client';
import { config } from 'dotenv';

// Load .env file
config();

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
});

try {
  const result = await client.execute('SELECT 1 as test');
  console.log('✅ Connection successful!');
  console.log('Result:', result);
} catch (error) {
  console.error('❌ Connection failed:', error.message);
  console.error('URL:', process.env.DATABASE_URL);
  console.error('Token length:', process.env.DATABASE_AUTH_TOKEN?.length);
}
