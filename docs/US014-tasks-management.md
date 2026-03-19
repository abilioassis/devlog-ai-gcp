# US014: Criação e Gestão de Tarefas (AgileBoard)

## 1. A Narrativa

**Como** Usuário do AgileBoard  
**Quero** criar e listar tarefas dentro de um bucket específico  
**Para que** eu possa desmembrar meu plano em itens acionáveis.

## 2. Critérios de Aceite

- **Critério 1: Criação de Tarefa**
  - **Dado que** o usuário está em um plano;
  - **Quando** ele clicar em "Adicionar Tarefa" em um bucket;
  - **Então** um formulário deve abrir para inserir: Título, Data de Conclusão e Prioridade.
- **Critério 2: Persistência**
  - **Dado que** o formulário é enviado;
  - **Então** a tarefa deve ser salva no banco de dados vinculada ao `bucket_id` correto.

## 3. Requisitos Não Funcionais (NFRs)

- **Schema:** Atualizar `src/db/schema.ts` para incluir a tabela `tasks`.
- **Relacionamentos:** Definir `relations` no Drizzle entre `Bucket` e `Task`.
- **UX:** Uso de `Dialog` (shadcn) para o formulário de criação de tarefa.
- **Formulário:** Validação rigorosa com `Zod` (título obrigatório, data não pode ser anterior a hoje).
