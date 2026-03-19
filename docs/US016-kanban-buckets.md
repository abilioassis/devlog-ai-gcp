# US016: Gestão de Buckets e Movimentação de Tarefas

## 1. A Narrativa

**Como** Usuário do AgileBoard  
**Quero** criar, editar buckets e mover tarefas entre eles  
**Para que** eu possa organizar meu fluxo de trabalho em um Kanban funcional.

## 2. Critérios de Aceite

- **Critério 1: Gestão de Buckets**
  - **Dado que** o usuário está no AgileBoard;
  - **Quando** ele clicar em "Adicionar Bucket" ou "Editar Bucket";
  - **Então** um modal deve abrir para inserir o nome. O bucket deve ser salvo no banco e exibido como uma nova coluna.

- **Critério 2: Movimentação de Tarefas**
  - **Dado que** o usuário visualiza uma tarefa dentro de um bucket;
  - **Quando** ele alterar o bucket da tarefa (via select/dropdown no card da tarefa);
  - **Então** o sistema deve atualizar o `bucket_id` da tarefa no banco e atualizar o quadro imediatamente.

## 3. Requisitos Não Funcionais (NFRs)

- **Schema:** Definir a relação `Plan` -> `Buckets` -> `Tasks`.
- **Server Actions:** `createBucket`, `updateBucket`, `moveTask`.
- **UX:** Feedback visual imediato após mover uma tarefa.
- **Segurança:** Validar se o bucket de destino pertence ao mesmo plano da tarefa antes de permitir a movimentação.
