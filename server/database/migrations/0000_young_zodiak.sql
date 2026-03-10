CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`content` text NOT NULL,
	`category` text NOT NULL,
	`image` text NOT NULL,
	`date` text NOT NULL,
	`read_time` text NOT NULL
);
