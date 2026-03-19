import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


export const requestStatusEnum = pgEnum("request_status", [
  "pending",
  "in_progress",
  "completed",
  "cancelled",
  "approved",
  "rejected",
]);

export const auditActionEnum = pgEnum("audit_action", ["APPROVE", "REJECT"]);

export const taskPriorityEnum = pgEnum("task_priority", ["low", "medium", "high"]);


export const requests = pgTable("requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  status: requestStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  requestId: uuid("request_id")
    .references(() => requests.id)
    .notNull(),
  action: auditActionEnum("action").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  userId: text("user_id").notNull(),
});

export const plans = pgTable("plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const buckets = pgTable("buckets", {
  id: uuid("id").primaryKey().defaultRandom(),
  planId: uuid("plan_id")
    .references(() => plans.id)
    .notNull(),
  name: text("name").notNull(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  bucketId: uuid("bucket_id")
    .references(() => buckets.id)
    .notNull(),
  title: text("title").notNull(),
  priority: taskPriorityEnum("priority").default("medium").notNull(),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const plansRelations = relations(plans, ({ many }) => ({
  buckets: many(buckets),
}));

export const bucketsRelations = relations(buckets, ({ one, many }) => ({
  plan: one(plans, {
    fields: [buckets.planId],
    references: [plans.id],
  }),
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  bucket: one(buckets, {
    fields: [tasks.bucketId],
    references: [buckets.id],
  }),
}));


