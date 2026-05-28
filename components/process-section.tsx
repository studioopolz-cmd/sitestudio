const steps = [
  {
    n: "01",
    title: "Briefing & Alinhamento",
    desc: "Entendemos sua marca e seus objetivos antes de qualquer traço.",
  },
  {
    n: "02",
    title: "Pesquisa & Conceito",
    desc: "Estruturamos ideias e buscamos referências que sustentam a direção.",
  },
  {
    n: "03",
    title: "Criação & Refino",
    desc: "Execução de alto padrão com revisões precisas em cada etapa.",
  },
  {
    n: "04",
    title: "Entrega & Suporte",
    desc: "Entrega organizada e preparada para aplicação profissional da marca.",
  },
]

export function ProcessSection() {
  return (
    <section id="processo" className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12">
          <span className="label-mono text-primary">Como trabalhamos</span>
          <h2 className="mt-4 font-display text-4xl uppercase md:text-5xl">
            Nosso processo
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="group relative">
              <div className="mb-6 h-px w-full bg-border">
                <div className="h-px w-0 bg-primary transition-all duration-700 group-hover:w-full" />
              </div>
              <span className="font-display text-5xl text-muted-foreground/40 transition-colors group-hover:text-primary">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-xl uppercase">{s.title}</h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
