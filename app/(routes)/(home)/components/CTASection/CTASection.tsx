import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Reveal } from "@/components/Shared/Reveal/Reveal";

export function CTASection() {
  return (
    <Reveal position="right" className="px-4 py-28 flex flex-col items-center text-center gap-6">
      <h2 className="text-3xl sm:text-5xl font-bold max-w-2xl leading-tight">
        Empieza a organizar tu trabajo{" "}
        <span className="text-primary">hoy mismo</span>
      </h2>
      <p className="text-muted-foreground text-lg max-w-md">
        Gratis para siempre en el plan básico. Sin tarjeta de crédito.
      </p>
      <Link href="/sign-in">
        <InteractiveHoverButton>Crear una cuenta</InteractiveHoverButton>
      </Link>
    </Reveal>
  );
}
