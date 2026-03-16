# US004: Seletor de Intervalo de Tempo (Timeframe Picker)

## 1. A Narrativa

**Como** Usuário Analista do PetroDash  
**Quero** filtrar o histórico de cotação do barril de petróleo por intervalos de tempo específicos (1D, 1M, 6M, 1A, 5A)  
**Para que** eu possa analisar tendências de mercado de curto, médio e longo prazo de forma dinâmica.

## 2. Critérios de Aceite

- **Critério 1: Seletor de Intervalo (UI)**
  - **Dado que** o usuário visualiza o Dashboard;
  - **Quando** ele observar o topo do gráfico;
  - **Então** ele deve visualizar um componente de controle (Segmented Control ou Tabs) com as opções de intervalo: [ 1M | 6M | 1A ].

- **Critério 2: Reatividade e Atualização de Dados**
  - **Dado que** o usuário clica em um dos intervalos;
  - **Quando** o intervalo for alterado;
  - **Então** a aplicação deve realizar uma nova requisição (ou filtro no conjunto de dados) e atualizar o gráfico instantaneamente, exibindo os novos valores.

- **Critério 3: Feedback de Carregamento**
  - **Dado que** o usuário solicita uma nova faixa de dados;
  - **Quando** os dados estiverem sendo buscados;
  - **Então** o gráfico deve exibir um estado de _Loading_ (Skeleton) para indicar que a atualização está em curso.

## 3. Requisitos Não Funcionais (NFRs)

- **Arquitetura:** O estado do intervalo selecionado deve ser gerenciado para que o gráfico reflita exatamente o período solicitado. A Server Action deve receber esse parâmetro de forma tipada (ex: `type TimeRange = '1d' | '1m' | ...`).
- **Acessibilidade:** O seletor deve ser 100% navegável por teclado, respeitando os padrões do `shadcn/ui`.
- **Desempenho:** Evitar _re-fetches_ desnecessários. Se o usuário clicar no mesmo intervalo, o sistema deve ignorar a requisição (o Agente deve implementar um gerenciamento de estado simples ou `useMemo` se necessário).
- **Nota:** O escopo de intervalos foi restringido a 1m, 6m e 1y devido a limitações de disponibilidade de dados da API financeira utilizada.
