# US006: SGR - Sistema de Gestão de Requisições (Backend & DB)

## 1. A Narrativa

**Como** Colaborador da uma grande multinacional  
**Quero** registrar solicitações de recursos (acessos, equipamentos ou licenças)  
**Para que** eu possa acompanhar o fluxo de aprovação e obter os recursos necessários para o meu trabalho.

## 2. Critérios de Aceite

- **Critério 1: Criação de Requisição**
  - **Dado que** o usuário está logado;
  - **Quando** ele preencher o formulário de requisição (Título, Descrição, Categoria) e enviar;
  - **Então** o registro deve ser salvo com sucesso no banco de dados com o status "Pendente".

- **Critério 2: Listagem de Requisições**
  - **Dado que** o usuário acessa a página do SGR;
  - **Quando** a página carregar;
  - **Então** ele deve visualizar uma tabela com todas as suas requisições anteriores, mostrando ID, Título, Status e Data de Criação.

- **Critério 3: Persistência Robusta**
  - **Dado que** o sistema precisa armazenar dados;
  - **Quando** houver uma operação de escrita;
  - **Então** os dados devem ser gravados em uma tabela relacional (PostgreSQL) usando um ORM (Drizzle ou Prisma).

## 3. Requisitos Não Funcionais (NFRs)

- **Arquitetura Full-Stack:** O sistema deve ter uma separação clara entre Frontend (Next.js) e Backend (API Routes ou Server Actions que comunicam com o Banco).
- **Banco de Dados:** PostgreSQL (vamos configurar um container Docker local para desenvolvimento que espelha o Cloud SQL do GCP).
- **Segurança:** As operações de escrita devem ser protegidas.
- **Observabilidade:** Logs de erro claros caso a conexão com o banco de dados falhe.
