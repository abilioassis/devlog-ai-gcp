# US001: Estruturação do Layout Base (DevLog)

## 1. A Narrativa

**Como** Desenvolvedor do Projeto DevLog  
**Quero** implementar um layout estrutural padrão utilizando `shadcn/ui`  
**Para que** todas as páginas da aplicação tenham uma identidade visual consistente, navegação intuitiva e suporte nativo a temas (Light/Dark).

## 2. Critérios de Aceite

- **Critério 1: Estrutura de Layout (Sidebar + Content)**
  - **Dado que** o usuário acessa a página raiz `/`;
  - **Quando** a página for carregada;
  - **Então** ela deve exibir um `Sidebar` fixo à esquerda (utilizando os componentes de navegação do shadcn) e uma área de conteúdo principal expansível à direita.

- **Critério 2: Header Funcional**
  - **Dado que** o usuário visualiza o layout;
  - **Quando** observar o Header;
  - **Então** ele deve conter o título "DevLog" e um componente `ThemeToggle` posicionado à direita para alternância entre Dark e Light mode.

- **Critério 3: Design System e Tokens**
  - **Dado que** o shadcn/ui foi configurado no projeto;
  - **Quando** os componentes forem renderizados;
  - **Então** todo o design (cores, espaçamentos, tipografia) deve respeitar estritamente as variáveis CSS definidas no preset injetado durante o setup inicial.

## 3. Requisitos Não Funcionais (NFRs)

- **Stack Tecnológica:** Next.js (App Router), TypeScript, Tailwind CSS e `shadcn/ui`.
- **Acessibilidade (a11y):** Os componentes de navegação devem ser acessíveis via teclado (foco e navegação).
- **Arquitetura:** O layout deve ser definido no `layout.tsx` raiz (ou em um componente de layout reutilizável), garantindo que a sidebar persista entre as rotas.
- **Manutenibilidade:** Não criar componentes de layout "hardcoded". Utilizar a CLI do shadcn para adicionar quaisquer componentes de UI necessários (ex: `npx shadcn@latest add sidebar`).
