import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Highlighter } from "@/components/ui/highlighter";
import { TextAnimate } from "@/components/ui/text-animate";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 pt-40 pb-24 gap-6">
      <AnimatedGradientText className="text-sm">
        <span className="mr-1">✨</span>
        <hr className="mx-2 h-4 w-px shrink-0 bg-transparent" />
        <span
          className={cn(
            "inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
          )}
        >
          Gestión de proyectos, simplificada
        </span>
        <ChevronRight className="ml-1 size-3" />
      </AnimatedGradientText>

      <TextAnimate
        animation="blurInUp"
        className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl"
        once
      >
        Organiza tu trabajo.
      </TextAnimate>
      <TextAnimate
        animation="slideLeft"
        className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl leading-tight"
      >
        Colabora sin fricciones.
      </TextAnimate>

      <p className="text-lg text-muted-foreground max-w-xl">
        Boards,{" "}
        <Highlighter action="underline" color="#FF9800">
          listas, tareas y más
        </Highlighter>{" "}
        — todo en un solo lugar. Invita a tu equipo, asigna tareas y lleva el
        control de cada{" "}
        <Highlighter action="highlight" color="#87CEFA">
          proyecto
        </Highlighter>{" "}
        en tiempo real.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link href="/sign-in">
          <InteractiveHoverButton>Empieza ahora</InteractiveHoverButton>
        </Link>
        {/* <Button
          size="lg"
          variant="outline"
          render={<Link href="/sign-in" />}
          nativeButton={false}
        >
          Ver demo
        </Button> */}
      </div>

      <p className="text-xs text-muted-foreground">
        Gratis · Configuración en 2 minutos
      </p>
    </section>
  );
}
