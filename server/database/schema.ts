// server/database/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  category: text('category').notNull(),
  image: text('image').notNull(),
  date: text('date').notNull(),
  readTime: text('read_time').notNull(),
  
  // --- SEO FIELDS ---
  metaTitle: text('meta_title'),       // Google Search Title
  metaDescription: text('meta_desc'),   // Google Search Description
  keywords: text('keywords'),           // Relevant keywords
  canonicalUrl: text('canonical_url'),  
  isPublished: integer('is_published').default(1), // Draft vs Published
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').default('user'), 
});
