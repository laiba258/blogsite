// server/database/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  category: text('category').notNull(), // Tech, Design, etc.
  image: text('image').notNull(),
  date: text('date').notNull(),
  readTime: text('read_time').notNull(),
});