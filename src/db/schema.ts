import { pgTable, text, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';

export const requestStatusEnum = pgEnum('request_status', ['pending', 'in_progress', 'completed', 'cancelled', 'approved', 'rejected']);

export const requests = pgTable('requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  status: requestStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
