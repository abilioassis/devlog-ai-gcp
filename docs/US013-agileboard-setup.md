# US013: Fundação do AgileBoard e Gestão de Planos

## 1. A Narrativa

**Como** Usuário do Sistema  
**Quero** criar um novo quadro de planejamento (Plano) com um nome  
**Para que** eu possa organizar minhas tarefas de forma estruturada.

## 2. Critérios de Aceite

- **Critério 1: Criação de Plano**
  - **Dado que** o usuário está na tela de "AgileBoard";
  - **Quando** ele preencher o nome do plano e clicar em "Criar";
  - **Então** um novo plano deve ser criado no banco de dados e o usuário deve ser redirecionado para o quadro desse plano.

- **Critério 2: Estrutura de Dados (Buckets)**
  - **Dado que** um plano é criado;
  - **Quando** ele for visualizado;
  - **Então** ele deve iniciar com, pelo menos, um bucket padrão: "Tarefas Pendentes".

## 3. Requisitos Não Funcionais (NFRs)

- **Modelagem de Dados (Drizzle):**
  - Tabela `plans` (id, name, created_at).
  - Tabela `buckets` (id, plan_id, name).
  - Tabela `tasks` (id, bucket_id, title, status, priority, etc).
- **QA & Testes Automatizados:**
  - Teste Unitário (Vitest): Validar que um plano não pode ser criado sem nome (validação Zod).
  - Teste E2E (Playwright): Validar o fluxo completo de criação de um plano até a visualização do quadro vazio.
