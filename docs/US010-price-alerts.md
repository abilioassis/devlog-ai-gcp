# US010: Sistema de Alertas de Preço

## 1. A Narrativa

**Como** Usuário Analista  
**Quero** definir um valor de referência no gráfico  
**Para que** eu possa visualizar quando o preço do petróleo cruza o meu alvo de investimento.

## 2. Critérios de Aceite

- **Input de Alerta:** Campo de input numérico para definir o "Preço Alvo" com botão para aplicar no gráfico.
- **Visualização:** Desenhar uma linha horizontal (`ReferenceLine` do Recharts) no gráfico baseada no valor do input.
- **Persistência:** O valor do alerta deve persistir no `localStorage`.
- **Reatividade:** A linha deve atualizar instantaneamente ao alterar o valor, sem recarregar a página.

## 3. Requisitos Não Funcionais (NFRs)

- **Componentes:** Usar `Input` e `Button` do `shadcn/ui`.
- **Gráfico:** Usar `ReferenceLine` da biblioteca `recharts` dentro do componente `BrentChart`.
- **Estado:** Utilizar `useState` para o preço alvo e `useEffect` para persistência no `localStorage`.
- **Integridade:** **Não** alterar a lógica de fetch existente (US009). Apenas adicionar o estado do alerta ao componente de gráfico.
