# US003: Dashboard de Commodities (PetroDash)

## 1. A Narrativa

**Como** Engenheiro de Software da Petrobras  
**Quero** visualizar um Dashboard de monitoramento do preço do barril de petróleo (Brent) em tempo real  
**Para que** eu possa acompanhar as variações de mercado sem precisar sair da minha aplicação.

## 2. Critérios de Aceite

- **Critério 1: Consumo de API (Server Side)**
  - **Dado que** o usuário acessa a rota `/dashboard`;
  - **Quando** a página é carregada;
  - **Então** o sistema deve realizar uma requisição segura (via Server Action) para uma API de mercado financeiro, recuperando a cotação atual do Brent.

- **Critério 2: Visualização de Dados (Gráficos)**
  - **Dado que** os dados foram recuperados com sucesso;
  - **Quando** o componente de gráfico for renderizado;
  - **Então** ele deve exibir uma série histórica de preços utilizando `recharts`, com design consistente (estilo `shadcn/ui`).

- **Critério 3: Loading States (UX)**
  - **Dado que** a requisição à API está em andamento;
  - **Quando** o usuário aguarda a resposta;
  - **Então** deve ser exibido um componente de _Skeleton_ (shadcn) para indicar que os dados estão sendo carregados, evitando saltos de layout.

- **Critério 4: Tratamento de Erros**
  - **Dado que** a API está indisponível ou retorna erro;
  - **Quando** a requisição falhar;
  - **Então** o sistema deve exibir uma mensagem amigável ao usuário, sem quebrar a interface da aplicação.

## 3. Requisitos Não Funcionais (NFRs)

- **Arquitetura:** Uso obrigatório de **Server Actions** para ocultar a API Key (não expor chaves no front-end).
- **Stack:** Next.js (App Router), `recharts` (para gráficos), `shadcn/ui` (Card, Skeleton, Button).
- **Segurança:** As chaves de API devem ser carregadas via variáveis de ambiente (`process.env`).
- **Acessibilidade:** Os gráficos devem possuir descrição textual para leitores de tela.
