CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'user'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `posts` ADD `meta_title` text;--> statement-breakpoint
ALTER TABLE `posts` ADD `meta_desc` text;--> statement-breakpoint
ALTER TABLE `posts` ADD `keywords` text;--> statement-breakpoint
ALTER TABLE `posts` ADD `canonical_url` text;--> statement-breakpoint
ALTER TABLE `posts` ADD `is_published` integer DEFAULT 1;