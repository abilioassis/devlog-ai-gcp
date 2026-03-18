# US012: Interface de Gestão de Requisições (SGR)

## 1. A Narrativa

**Como** Gestor do SGR  
**Quero** visualizar uma interface de gestão contendo botões de ação e status visual  
**Para que** eu possa aprovar ou reprovar requisições de forma ágil e segura.

## 2. Critérios de Aceite

- **Critério 1: Tabela de Gestão**
  - **Dado que** o gestor está na página `/sgr`;
  - **Então** ele deve ver uma tabela listando todas as requisições, exibindo Título, Status (em Badge colorido) e Ações.

- **Critério 2: Ações de Aprovação/Reprovação**
  - **Dado que** o usuário tem permissão (Admin);
  - **Então** ele deve ter acesso aos botões "Aprovar" e "Reprovar". Ao clicar, o sistema deve chamar a Server Action correspondente e atualizar o estado da tela (Revalidação).

- **Critério 3: Feedback Visual**
  - **Dado que** uma ação é realizada;
  - **Então** o sistema deve exibir um `Toast` de confirmação (shadcn) e o Badge de status deve mudar de cor (Pending=Amarelo, Approved=Verde, Rejected=Vermelho).

## 3. Requisitos Não Funcionais (NFRs)

- **Tecnologia:** Uso obrigatório de **Next.js (App Router)** e **TypeScript**.
- **Proibição:** É estritamente proibido o uso de Python, Flask ou qualquer framework não-Node.js.
- **Arquitetura:** O código deve consumir a Server Action já existente (usando `useTransition` ou `useFormState` para estados de carregamento).
- **Design:** Manter o padrão `shadcn/ui` (Table, Badge, Button, Toast).
