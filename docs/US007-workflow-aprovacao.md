# US007: Fluxo de Aprovação e Reprovação (Workflow de Gestão)

## 1. A Narrativa

**Como** Gestor/Aprovador  
**Quero** alterar o status de uma requisição de "pendente" para "aprovado" ou "reprovado"  
**Para que** eu possa dar vazão ao fluxo operacional.

## 2. Critérios de Aceite

- **Critério 1: Ações no Registro**
  - **Dado que** o usuário está na listagem de requisições;
  - **Quando** visualizar uma requisição pendente;
  - **Então** ele deve ter acesso aos botões "Aprovar" e "Reprovar".

- **Critério 2: Atualização de Banco de Dados**
  - **Dado que** o usuário clica em "Aprovar" ou "Reprovar";
  - **Quando** a ação for disparada;
  - **Então** o status no banco de dados deve ser atualizado para 'approved' ou 'rejected' utilizando o Drizzle ORM.

- **Critério 3: Feedback Visual**
  - **Dado que** a ação foi processada;
  - **Quando** o banco de dados retornar sucesso;
  - **Então** a lista deve ser atualizada automaticamente (revalidação do cache) e o usuário deve receber uma notificação de sucesso (Toast).

## 3. Requisitos Não Funcionais (NFRs)

- **Arquitetura:** As ações de aprovação devem ser Server Actions protegidas, garantindo que apenas registros válidos sejam alterados.
- **UI/UX:** O status deve mudar de cor dependendo do valor (ex: verde para aprovado, vermelho para reprovado) para facilitar a visualização do gestor.
