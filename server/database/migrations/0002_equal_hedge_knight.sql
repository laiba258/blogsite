PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`content` text NOT NULL,
	`category` text NOT NULL,
	`image` text NOT NULL,
	`date` text NOT NULL,
	`read_time` text NOT NULL,
	`meta_title` text,
	`meta_desc` text,
	`keywords` text,
	`canonical_url` text,
	`is_published` integer DEFAULT 1
);
--> statement-breakpoint
INSERT INTO `__new_posts`("id", "title", "description", "content", "category", "image", "date", "read_time", "meta_title", "meta_desc", "keywords", "canonical_url", "is_published") SELECT "id", "title", "description", "content", "category", "image", "date", "read_time", "meta_title", "meta_desc", "keywords", "canonical_url", "is_published" FROM `posts`;--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `__new_posts` RENAME TO `posts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'user'
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "name", "email", "password", "role") SELECT "id", "name", "email", "password", "role" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);