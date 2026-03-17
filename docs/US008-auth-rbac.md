# US008: Autenticação Híbrida e Controle de Acesso (RBAC)

## 1. A Narrativa

**Como** Gestor de Segurança da Informação  
**Quero** proteger as ações administrativas do sistema através de autenticação Google  
**Para que** apenas usuários autorizados possam aprovar ou reprovar requisições, enquanto mantenho a criação de requisições aberta para facilitar a operação.

## 2. Critérios de Aceite

- **Critério 1: Criação Pública (Sem Auth)**
  - **Dado que** um usuário acessa o formulário de nova requisição;
  - **Quando** ele submete o formulário;
  - **Então** o sistema deve processar a requisição sem exigir autenticação.

- **Critério 2: Proteção das Ações Administrativas (Auth Obrigatória)**
  - **Dado que** o usuário tenta clicar nos botões "Aprovar" ou "Reprovar";
  - **Quando** ele não estiver autenticado;
  - **Então** o sistema deve exibir um modal ou redirecioná-lo para o Login via Google.

- **Critério 3: Verificação de Role (RBAC)**
  - **Dado que** o usuário está autenticado;
  - **Quando** ele tenta executar a ação de aprovar/reprovar;
  - **Então** o servidor deve validar se o email do usuário consta na lista de 'gestores' (role 'admin') no banco de dados. Caso contrário, deve bloquear a ação com erro 403.

## 3. Requisitos Não Funcionais (NFRs)

- **Tecnologia:** Autenticação via `Auth.js` (NextAuth) com o **Google Provider**.
- **Segurança de Sessão:** As sessões devem ser gerenciadas via _HTTP-only cookies_ para evitar ataques de XSS. Segredos (`AUTH_SECRET`) devem ser gerenciados via variáveis de ambiente, nunca expostos no repositório.
- **Segurança de Autorização:** A validação da `role` deve ocorrer obrigatoriamente no lado do servidor (Server Actions). O front-end é apenas para feedback visual (esconder/mostrar botões), não para segurança.
- **Compliance e Privacidade:** O sistema deve estar alinhado com boas práticas de tratamento de dados pessoais (LGPD), armazenando apenas o essencial do perfil do usuário (email e nome).
- **Resiliência:** O sistema deve lidar graciosamente com falhas de comunicação com o provedor de identidade (Google), exibindo uma mensagem de erro compreensível ao usuário final.
