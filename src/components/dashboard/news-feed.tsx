"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsArticle } from "@/app/dashboard/actions";
import { CalendarIcon, ExternalLinkIcon } from "lucide-react";

interface NewsFeedProps {
  articles: NewsArticle[];
}

export function NewsFeed({ articles }: NewsFeedProps) {
  return (
    <Card className="flex flex-col h-[600px] border-none shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight">Últimas Notícias</CardTitle>
            <CardDescription>Principais manchetes do mercado de energia</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full px-6">
          <div className="space-y-6 pb-6">
            {articles.map((article, index) => (
              <div 
                key={index} 
                className="group relative flex flex-col space-y-2 pb-6 border-b last:border-0 border-border/40 transition-all hover:bg-muted/30 p-2 rounded-lg"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {article.source}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {new Date(article.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <h4 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex-none"
                >
                  Ler mais <ExternalLinkIcon className="ml-1 h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
