import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import AuthButton from "@/components/auth-button";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Engineering Lab",
  description: "Portfólio de Projetos AI & Engenharia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-1 w-full flex-col">
              <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b px-4 md:px-6">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <h1 className="text-lg font-semibold tracking-tight">AI Engineering Lab</h1>
                </div>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <AuthButton />
                </div>
              </header>
              <div className="flex-1 p-4 md:p-6">
                {children}
              </div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
