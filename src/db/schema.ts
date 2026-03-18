import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

export const requestStatusEnum = pgEnum("request_status", [
  "pending",
  "in_progress",
  "completed",
  "cancelled",
  "approved",
  "rejected",
]);

export const auditActionEnum = pgEnum("audit_action", ["APPROVE", "REJECT"]);

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
