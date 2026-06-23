import { Star } from "@/components/star"

const packages = [
  {
    name: "Básico",
    deadline: "15 a 20 dias úteis",
    desc: "Ideal para marcas que precisam de uma identidade visual sólida e profissional.",
    features: [
      "Construção da identidade visual da marca",
      "Definição de cores e tipografia",
      "Logotipo em diferentes versões e formatos",
      "Apresentação visual profissional",
      "Arquivos finais prontos para uso",
    ],
    featured: false,
  },
  {
    name: "Gold",
    deadline: "20 a 25 dias úteis",
    desc: "Para marcas que querem transmitir mais presença, consistência e valor no mercado.",
    features: [
      "Tudo do pacote Básico",
      "Elementos gráficos exclusivos da marca",
      "Aplicações da identidade em materiais reais",
      "Mockups premium para apresentação",
      "Direção visual mais refinada",
    ],
    featured: true,
  },
  {
    name: "Premium",
    deadline: "25 a 35 dias úteis",
    desc: "A experiência completa para marcas que querem dominar cada ponto de contato.",
    features: [
      "Tudo dos pacotes Básico + Gold",
      "Construção visual avançada da marca",
      "Apresentação premium completa",
      "Aplicações estratégicas multi-canal",
      "Kit visual para redes sociais",
    ],
    featured: false,
  },
]

export function PricingSection() {
  return (
    <section id="pacotes" className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12">
          <span className="label-mono text-primary">Investimento</span>
          <h2 className="mt-4 font-display text-4xl uppercase md:text-5xl">
            Pacotes
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.name}
              className={`flex flex-col rounded-2xl border p-8 transition-transform duration-500 hover:-translate-y-1 ${
                p.featured
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`label-mono ${
                    p.featured ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  Pacote {p.name}
                </span>
                {p.featured && <Star className="size-4 text-primary-foreground" />}
              </div>

              <p
                className={`mt-4 text-pretty text-sm leading-relaxed ${
                  p.featured ? "text-primary-foreground/90" : "text-muted-foreground"
                }`}
              >
                {p.desc}
              </p>

              <div className="mt-6">
                <span className="font-display text-3xl">Sob consulta</span>
                <span
                  className={`label-mono mt-2 block ${
                    p.featured ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  Prazo: {p.deadline}
                </span>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Star
                      className={`mt-0.5 size-3 shrink-0 ${
                        p.featured ? "text-primary-foreground" : "text-primary"
                      }`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contato"
                className={`mt-8 flex items-center justify-center gap-2 rounded-full px-6 py-3 transition-transform duration-300 hover:scale-105 ${
                  p.featured
                    ? "bg-primary-foreground text-primary"
                    : "bg-foreground text-background"
                }`}
              >
                <span className="label-mono">Solicitar orçamento</span>
              </a>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <p className="label-mono text-muted-foreground">
            Valores definidos sob consulta — cada projeto é negociado caso a caso.
          </p>
          <p className="label-mono text-muted-foreground">
            Desenvolvimento de site* é opcional e orçado à parte.
          </p>
          <p className="label-mono text-muted-foreground">
            * O orçamento de site pode variar caso a caso, conforme o escopo do projeto.
          </p>
          <p className="label-mono text-muted-foreground">
            Prazos contados em dias úteis após aprovação do briefing.
          </p>
        </div>
      </div>
    </section>
  )
}
