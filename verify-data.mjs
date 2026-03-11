import { createClient } from '@libsql/client';
import { config } from 'dotenv';

config();

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
});

console.log('📊 Checking Turso database...\n');

try {
  const posts = await client.execute('SELECT * FROM posts');
  console.log(`✅ Found ${posts.rows.length} posts in database:\n`);
  
  posts.rows.forEach((post, index) => {
    console.log(`${index + 1}. ${post.title}`);
    console.log(`   Category: ${post.category} | Read Time: ${post.readTime}`);
    console.log('');
  });
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
