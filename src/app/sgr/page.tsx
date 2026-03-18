import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { requests } from "@/db/schema";
import { RequestActions } from "@/components/sgr/request-actions";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { auditLogs } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { History } from "lucide-react";

export default async function SGRDashboard() {
  const session = await auth();
  const userEmail = session?.user?.email;
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
  const isAdmin = !!userEmail && adminEmails.includes(userEmail);

  const allRequests = await db
    .select()
    .from(requests)
    .orderBy(desc(requests.createdAt));

  const allAuditLogs = await db
    .select()
    .from(auditLogs)
    .orderBy(desc(auditLogs.timestamp));

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestão de Requisições (SGR)
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe o status e gerencie todas as requisições do sistema.
          </p>
        </div>
        <Button asChild>
          <Link href="/sgr/new">Nova Requisição</Link>
        </Button>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        {allRequests.length === 0 ? (
          <p className="text-muted-foreground text-center py-10">
            Nenhuma requisição encontrada.
          </p>
        ) : (
          <div className="space-y-4">
            {allRequests.map((req) => (
              <div key={req.id} className="p-4 border rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{req.title}</h3>
                  {req.status === "pending" && (
                    <Badge variant="secondary">
                      pending
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {req.description}
                </p>
                <div className="mt-4">
                  <div className="text-xs text-muted-foreground mb-4">
                    Criado em:{" "}
                    {new Date(req.createdAt).toLocaleDateString("pt-BR")}
                  </div>
                  
                  <div className="grid grid-cols-2 items-center gap-4">
                    <div className="flex items-center">
                      {req.status === "pending" ? (
                        isAdmin && (
                          <RequestActions
                            requestId={req.id}
                            currentStatus={req.status}
                          />
                        )
                      ) : (
                        <Badge variant={
                          req.status === "approved"
                            ? "default"
                            : "destructive"
                        } className={req.status === "approved" ? "bg-green-600 hover:bg-green-600" : ""}>
                          {req.status === "approved" ? "Aprovado" : "Reprovado"}
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-2">
                            <History className="h-4 w-4" />
                            Histórico
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="sm:max-w-md">
                          <SheetHeader>
                            <SheetTitle>Histórico de Auditoria</SheetTitle>
                            <SheetDescription>
                              Ações realizadas na requisição: {req.title}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="mt-6 space-y-4">
                            {allAuditLogs
                              .filter((log) => log.requestId === req.id)
                              .map((log) => (
                                <div key={log.id} className="border-l-2 border-primary pl-4 py-1">
                                  <div className="flex justify-between items-start">
                                    <span className="font-medium">
                                      {log.action === "APPROVE" ? "Aprovado" : "Reprovado"}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(log.timestamp).toLocaleString("pt-BR")}
                                    </span>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Por: {log.userId}
                                  </p>
                                </div>
                              ))}
                            {allAuditLogs.filter((log) => log.requestId === req.id).length === 0 && (
                              <p className="text-sm text-muted-foreground text-center py-4">
                                Nenhum registro de auditoria encontrado.
                              </p>
                            )}
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
