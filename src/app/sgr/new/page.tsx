import { RequestForm } from '@/components/sgr/request-form';

export default function NewRequestPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nova Requisição</h1>
        <p className="text-muted-foreground mt-2">
          Preencha os dados abaixo para criar uma nova requisição no sistema.
        </p>
      </div>
      
      <div className="border rounded-lg p-6 bg-card">
        <RequestForm />
      </div>
    </div>
  );
}
