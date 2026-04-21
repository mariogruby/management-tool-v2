import { HomeNavbar } from "@/components/Shared/HomeNavbar/HomeNavbar";
import { HomeFooter } from "@/components/Shared/HomeFooter/HomeFooter";
import { CTASection } from "../components/CTASection/CTASection";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Reveal } from "@/components/Shared/Reveal/Reveal";
import { mainStats, benefits, pillars } from "./data";

export default function EstadisticasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HomeNavbar />

      <main className="flex flex-col flex-1 pt-16">
        {/* Hero */}
        <Reveal
          position="bottom"
          className="px-4 sm:px-8 py-20 text-center max-w-3xl mx-auto"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
            Estadísticas
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Números que hablan por sí solos
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Kiki está construido para que los equipos trabajen mejor. Estos son
            los resultados que los equipos reales consiguen.
          </p>
        </Reveal>

        {/* Main stats */}
        <Reveal position="bottom" className="border-y bg-muted/30 py-20">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {mainStats.map(({ value, suffix, label, desc }) => (
              <div key={label} className="flex flex-col gap-2">
                <div className="text-4xl sm:text-5xl font-bold flex items-end justify-center gap-0.5">
                  <NumberTicker value={value} />
                  <span>{suffix}</span>
                </div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Benefits grid */}
        <section className="px-4 sm:px-8 py-20 max-w-5xl mx-auto w-full">
          <Reveal position="bottom" className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Impacto en los equipos
            </h2>
            <p className="text-muted-foreground">
              Lo que reportan los equipos después de usar Kiki durante un mes.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ Icon, title, value, desc }) => (
              <Reveal key={title} position="bottom">
                <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon size={18} />
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {title}
                    </span>
                  </div>
                  <p className="text-4xl font-bold">{value}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Pillars */}
        <section className="border-t bg-muted/20 px-4 sm:px-8 py-20">
          <div className="max-w-5xl mx-auto">
            <Reveal position="bottom" className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Construido para durar
              </h2>
              <p className="text-muted-foreground">
                Seguridad, disponibilidad y rendimiento como base, no como
                extras.
              </p>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-3">
              {pillars.map(({ Icon, title, points }) => (
                <Reveal key={title} position="bottom">
                  <div className="p-6 rounded-xl border bg-card flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon size={18} />
                      </span>
                      <h3 className="font-semibold">{title}</h3>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <HomeFooter />
    </div>
  );
}
