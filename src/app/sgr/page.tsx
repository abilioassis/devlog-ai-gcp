import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { db } from '@/db';
import { requests } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { RequestActions } from '@/components/sgr/request-actions';
import { auth } from '@/auth';

export default async function SGRDashboard() {
  const session = await auth();
  const userEmail = session?.user?.email;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  const isAdmin = !!userEmail && adminEmails.includes(userEmail);

  const allRequests = await db.select().from(requests).orderBy(desc(requests.createdAt));

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Requisições (SGR)</h1>
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
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    req.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    req.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {req.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {req.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  Criado em: {new Date(req.createdAt).toLocaleDateString('pt-BR')}
                </div>
                {isAdmin && <RequestActions requestId={req.id} currentStatus={req.status} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
