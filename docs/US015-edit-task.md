# US016: Edição de Tarefas (AgileBoard)

## 1. A Narrativa

**Como** Usuário do AgileBoard  
**Quero** editar os detalhes de uma tarefa existente (título, descrição, prioridade, data)  
**Para que** eu possa corrigir informações ou atualizar o progresso de trabalho.

## 2. Critérios de Aceite

- **Critério 1: Edição em Contexto**
  - **Dado que** uma tarefa já existe no bucket;
  - **Quando** o usuário clica em "Editar" (ícone de lápis ou clicar no card);
  - **Então** um `Dialog` deve abrir pré-preenchido com os dados atuais da tarefa.

- **Critério 2: Persistência de Atualização**
  - **Dado que** o usuário altera os campos e salva;
  - **Então** a `Server Action` deve atualizar apenas o registro específico no banco de dados.

## 3. Requisitos Não Funcionais (NFRs)

- **Arquitetura:** Reutilizar o componente de formulário da criação para a edição (passando `defaultValues` como propriedade).
- **Zod:** Manter a validação idêntica para evitar inconsistências entre criação e edição.
- **UX:** Feedback de sucesso (`Toast`) após a atualização.
