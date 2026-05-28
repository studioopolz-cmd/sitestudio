import { Star } from "@/components/star"

const services = [
  {
    n: "01",
    title: "Branding",
    desc: "Identidades visuais desenvolvidas para posicionar marcas com autoridade.",
  },
  {
    n: "02",
    title: "3D para Produtos",
    desc: "Criamos imagens que fazem seu produto parecer maior que o mercado.",
  },
  {
    n: "03",
    title: "Campanhas Visuais",
    desc: "Tratamento visual de alto nível para campanhas que exigem impacto.",
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <span className="label-mono text-primary">O que fazemos</span>
          <h2 className="mt-4 font-display text-4xl uppercase md:text-5xl">
            Serviços
          </h2>
        </div>
        <Star className="size-6 text-primary" />
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
        {services.map((s) => (
          <article
            key={s.n}
            className="group flex flex-col justify-between gap-16 bg-card p-8 transition-colors duration-500 hover:bg-primary md:p-10"
          >
            <div className="flex items-center justify-between">
              <span className="label-mono text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                {s.n}
              </span>
              <Star className="size-4 text-primary transition-colors group-hover:text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-2xl uppercase transition-colors group-hover:text-primary-foreground md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-4 max-w-xs text-pretty leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/90">
                {s.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
