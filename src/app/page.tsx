import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PortfolioHub() {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Portfólio</h2>
        <p className="text-muted-foreground">
          Explore os projetos de automação, engenharia de software e inteligência artificial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>📝 DevLog</CardTitle>
            <CardDescription>Editor minimalista de anotações Markdown.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              Sistema de gestão de conteúdo baseado em Markdown. Arquitetura: Persistência local (LocalStorage), composição de layout com Next.js App Router, CI/CD automatizado via Vercel e padrões de Design System (Tailwind/Shadcn).
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Shadcn/UI</Badge>
              <Badge variant="secondary">Vercel</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/devlog">Acessar Projeto</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>⛽ PetroDash</CardTitle>
            <CardDescription>Dashboard interativo de dados financeiros do Petróleo Brent.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              Plataforma de visualização de dados financeiros em tempo real. Arquitetura: Integração segura de APIs via Server Actions, validação de contratos de dados com Zod, renderização visual com Recharts e Design Tokens baseados em CSS Variables.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">Server Actions</Badge>
              <Badge variant="secondary">Recharts</Badge>
              <Badge variant="secondary">Zod</Badge>
              <Badge variant="secondary">API Integration</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard">Acessar Projeto</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>📋 SGR</CardTitle>
            <CardDescription>Sistema de Gestão de Requisições.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              Sistema corporativo de gestão de fluxo de trabalho. Arquitetura: Persistência relacional (PostgreSQL + Drizzle ORM), camada de segurança via OAuth 2.0 (RBAC), validação de esquema Zod e ambiente de desenvolvimento conteinerizado (Docker).
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">PostgreSQL</Badge>
              <Badge variant="secondary">Drizzle ORM</Badge>
              <Badge variant="secondary">NextAuth</Badge>
              <Badge variant="secondary">Docker</Badge>
              <Badge variant="secondary">Shadcn/UI</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/sgr">Acessar Projeto</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col border-primary/20 hover:border-primary/50 transition-colors shadow-sm">
          <CardHeader>
            <CardTitle>🏗️ AgileBoard</CardTitle>
            <CardDescription>Sistema de Planejamento Ágil (Kanban).</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              Plataforma de gestão de projetos com suporte a múltiplos quadros. Arquitetura: Estruturação estrita de pastas por domínio, persistência escalável via Drizzle ORM, validação de tipos em tempo real com Zod e UX reativa.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">Drizzle ORM</Badge>
              <Badge variant="secondary">Zod</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Shadcn/UI</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/agileboard">Acessar Projeto</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
