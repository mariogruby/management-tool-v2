import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit, Figtree } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kiki — Gestión de proyectos",
    template: "%s | Kiki",
  },
  description: "Organiza proyectos, colabora con tu equipo y alcanza tus objetivos con Kiki. Boards Kanban, tareas, subtareas, calendario y más.",
  keywords: ["gestión de proyectos", "kanban", "tareas", "colaboración", "equipos", "productividad"],
  authors: [{ name: "Kiki" }],
  creator: "Kiki",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://kikiboard.xyz"),
  openGraph: {
    title: "Kiki — Gestión de proyectos",
    description: "Organiza proyectos, colabora con tu equipo y alcanza tus objetivos.",
    url: "https://kikiboard.xyz",
    siteName: "Kiki",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiki — Gestión de proyectos",
    description: "Organiza proyectos, colabora con tu equipo y alcanza tus objetivos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body className={outfit.className}>
        <ClerkProvider>
          {children}
          <Toaster richColors closeButton position="bottom-right" />
        </ClerkProvider>
      </body>
    </html>
  );
}
