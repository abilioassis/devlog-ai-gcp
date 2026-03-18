import { relations } from "drizzle-orm/relations";
import { requests, auditLogs } from "./schema";

export const auditLogsRelations = relations(auditLogs, ({one}) => ({
	request: one(requests, {
		fields: [auditLogs.requestId],
		references: [requests.id]
	}),
}));

export const requestsRelations = relations(requests, ({many}) => ({
	auditLogs: many(auditLogs),
}));