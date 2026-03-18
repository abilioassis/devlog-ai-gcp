# US011: Auditoria de Requisições (Audit Log)

## 1. A Narrativa

**Como** Auditor de Compliance  
**Quero** visualizar um histórico detalhado de todas as alterações feitas nas requisições  
**Para que** eu possa garantir a transparência e a rastreabilidade das aprovações.

## 2. Critérios de Aceite

- **Critério 1: Captura de Eventos**
  - **Dado que** uma requisição sofre uma alteração (Aprovação/Reprovação);
  - **Quando** a Server Action de atualização for executada;
  - **Então** um registro deve ser criado na tabela `audit_logs` contendo: ID da requisição, usuário que alterou, status anterior, status novo e timestamp.

- **Critério 2: Visualização de Histórico**
  - **Dado que** o usuário visualiza o detalhe de uma requisição;
  - **Quando** ele rolar a página até o fim;
  - **Então** ele deve ver uma lista cronológica das alterações (Timeline).

## 3. Requisitos Não Funcionais (NFRs)

- **Banco de Dados:** Criar a tabela `audit_logs` no PostgreSQL via Drizzle.
- **Atomicidade:** A atualização da requisição e a criação do log de auditoria devem ocorrer dentro da mesma _Transação_ (se um falhar, o outro não pode ser gravado).
- **Segurança:** O log de auditoria deve ser imutável (apenas leitura para usuários comuns).
