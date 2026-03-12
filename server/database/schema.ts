import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  date: text("date").notNull(),
  readTime: text("read_time").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_desc"),
  keywords: text("keywords"),
  canonicalUrl: text("canonical_url"),
  isPublished: integer("is_published").default(1),
});

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user"),
});

export const staticPages = sqliteTable("static_pages", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_desc"),
  updatedAt: text("updated_at").notNull(),
});
