import Image from "next/image"
import { Star } from "@/components/star"

export function HeroSection() {
  return (
    <section id="topo" className="relative overflow-hidden pt-28 md:pt-32">
      {/* top meta bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <span className="label-mono text-muted-foreground">Creative Studio</span>
        <div className="flex items-center gap-6">
          <span className="label-mono text-muted-foreground">Brasil</span>
          <span className="label-mono text-primary">2026</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-16 pt-8 md:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-14">
        {/* headline */}
        <div className="lg:col-span-7">
          <Image
            src="/brand/opolz-red.png"
            alt="OPOLZ Studio"
            width={1252}
            height={768}
            priority
            className="mb-8 h-16 w-auto sm:h-20 lg:h-24"
          />
          <h1 className="font-display text-balance text-[2.6rem] uppercase leading-[0.92] sm:text-6xl lg:text-7xl">
            Não criamos
            <br />
            apenas visuais.
            <br />
            <span className="text-primary">Construímos presença</span>
            <br />
            para marcas que
            <br />
            querem ser lembradas.
          </h1>

          <p className="mt-8 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Estúdio criativo brasileiro especializado em branding, 3D para
            produtos e campanhas visuais de alto nível. Marcas com atitude — é
            o que a gente faz.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#trabalhos"
              className="group flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-background transition-transform duration-300 hover:scale-105"
            >
              <span className="label-mono">Ver trabalhos</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {"->"}
              </span>
            </a>
            <a
              href="#contato"
              className="label-mono text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Elevar minha marca
            </a>
          </div>
        </div>

        {/* image */}
        <div className="relative lg:col-span-5">
          <div className="grain group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card">
            <Image
              src="/works/caixa.png"
              alt="Caixa metálica com a etiqueta vermelha da Dr Peanut"
              fill
              priority
              className="object-contain p-6 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-background/90 to-transparent p-5">
              <span className="label-mono text-foreground">OPOLZ STUDIO®</span>
              <Star className="size-4 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* marquee */}
      <div className="border-y border-border bg-card/40 py-4">
        <div className="flex animate-[marquee_28s_linear_infinite] gap-8 whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-display text-xl uppercase tracking-tight text-muted-foreground">
                Marcas com Atitude
              </span>
              <Star className="size-3 shrink-0 text-primary" />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
