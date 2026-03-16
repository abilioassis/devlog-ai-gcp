# US005: Criação do Portfolio Hub (Landing Page Central)

## 1. A Narrativa

**Como** Engenheiro de Software  
**Quero** centralizar todos os meus projetos (AI Engineering Lab) em uma única Home Page profissional  
**Para que** eu possa apresentar o progresso dos meus experimentos para colegas e stakeholders de forma organizada.

## 2. Critérios de Aceite

- **Critério 1: Landing Page Central (Hub)**
  - **Dado que** o usuário acessa a raiz do sistema (`/`);
  - **Quando** a página for carregada;
  - **Então** ela deve exibir uma vitrine (grid de Cards) com os 5 projetos (DevLog, PetroDash e futuros).

- **Critério 2: Rebranding do Sistema**
  - **Dado que** o sistema agora é uma plataforma;
  - **Quando** o usuário observar o Sidebar e Header;
  - **Então** o nome do projeto deve ser atualizado de "DevLog" para "AI Engineering Lab".

- **Critério 3: Navegação Integrada**
  - **Dado que** o usuário está na Home;
  - **Quando** clicar em um Card de projeto;
  - **Então** ele deve ser redirecionado para a rota específica daquele projeto, mantendo a Sidebar global de navegação visível.

## 3. Requisitos Não Funcionais (NFRs)

- **Arquitetura:** A página raiz (`app/page.tsx`) deve ser convertida em um componente de Landing Page e não conter lógica de projeto específico.
- **Design:** Uso de `shadcn/ui` (Cards, Badge, Button) para criar uma vitrine visual atraente.
- **Responsividade:** O grid de projetos deve se ajustar automaticamente (1 coluna no mobile, 3 colunas no desktop).
