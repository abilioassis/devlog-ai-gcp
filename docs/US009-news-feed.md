# US009: Integração de Feed de Notícias de Energia

## 1. A Narrativa

**Como** Usuário Analista  
**Quero** visualizar um feed com as últimas notícias sobre o mercado de petróleo  
**Para que** eu possa entender os gatilhos das variações de preço exibidas no gráfico.

## 2. Critérios de Aceite

- **Critério 1: Fetching Paralelo**
  - **Dado que** o usuário acessa a rota `/dashboard`;
  - **Quando** a página carrega;
  - **Então** o sistema deve buscar os dados do gráfico e as notícias simultaneamente (Parallel Data Fetching), garantindo que um não bloqueie o outro.

- **Critério 2: Componente de Lista**
  - **Dado que** as notícias foram recuperadas;
  - **Quando** exibidas na interface;
  - **Então** devem aparecer em um componente de lista (shadcn `ScrollArea` + `Card`), com título, fonte e link para leitura.

## 3. Requisitos Não Funcionais (NFRs)

- **Arquitetura:** Uso de `Promise.all` ou `Suspense` para carregar ambos os dados de forma otimizada.
- **Resiliência:** Se a API de notícias falhar, o Dashboard deve continuar funcionando normalmente (exibindo apenas o gráfico).
