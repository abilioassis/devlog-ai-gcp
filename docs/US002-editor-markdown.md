# US002: Implementação do Editor de Notas Markdown

## 1. A Narrativa

**Como** Usuário do DevLog  
**Quero** ter uma área de edição funcional para escrever e visualizar notas em formato Markdown  
**Para que** eu possa registrar meus aprendizados diários de forma estruturada e persistente.

## 2. Critérios de Aceite

- **Critério 1: Área de Edição e Visualização**
  - **Dado que** o usuário está na página inicial;
  - **Quando** o componente `NoteEditor` for carregado;
  - **Então** ele deve exibir um campo `Textarea` (shadcn) para escrita e uma área dedicada (Card shadcn) para renderização do conteúdo formatado em Markdown à direita ou abaixo.

- **Critério 2: Persistência de Dados**
  - **Dado que** o usuário digita conteúdo no editor;
  - **Quando** ele fizer alterações ou clicar no botão "Salvar";
  - **Então** o conteúdo da nota deve ser persistido automaticamente no `localStorage` do navegador, garantindo que os dados não sejam perdidos ao recarregar a página.

- **Critério 3: Funcionalidades de Gerenciamento**
  - **Dado que** o usuário deseja realizar ações sobre sua nota;
  - **Quando** interagir com os botões "Nova Nota" ou "Salvar";
  - **Então** o sistema deve limpar o editor para uma nova entrada ou confirmar o salvamento do estado atual na memória local.

## 3. Requisitos Não Funcionais (NFRs)

- **Stack Tecnológica:** Next.js (App Router), TypeScript, `shadcn/ui` (Textarea, Card, Button), `react-markdown` (para processamento do conteúdo).
- **Acessibilidade (a11y):** O editor deve permitir navegação eficiente via teclado e os campos de input devem possuir _labels_ associados ou descrições visíveis.
- **Arquitetura:** O estado da nota deve ser gerenciado via _hooks_ do React (`useState` / `useEffect`), mantendo a lógica de persistência desacoplada da view (componente funcional puro).
- **Manutenibilidade:** Utilizar componentes nativos do `shadcn/ui`. Evitar bibliotecas de terceiros pesadas para o editor, preferindo uma solução baseada em um `Textarea` controlado com preview renderizado via `react-markdown`.
