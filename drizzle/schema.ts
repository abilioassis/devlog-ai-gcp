import { pgTable, uuid, text, timestamp, foreignKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const auditAction = pgEnum("audit_action", ['APPROVE', 'REJECT'])
export const requestStatus = pgEnum("request_status", ['pending', 'in_progress', 'completed', 'cancelled', 'approved', 'rejected'])


export const requests = pgTable("requests", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	status: requestStatus().default('pending').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	requestId: uuid("request_id").notNull(),
	action: auditAction().notNull(),
	timestamp: timestamp({ mode: 'string' }).defaultNow().notNull(),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.requestId],
			foreignColumns: [requests.id],
			name: "audit_logs_request_id_requests_id_fk"
		}),
]);
