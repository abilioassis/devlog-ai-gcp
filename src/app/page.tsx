import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
              Aplicação focada em anotações rápidas para produtividade de desenvolvedores usando tipografia suave e auto-save.
            </p>
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
              Plataforma com gráficos integrados, Server Actions, Skeleton Loaders e validações de rede em tempo real providos pela B3.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard">Acessar Projeto</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
