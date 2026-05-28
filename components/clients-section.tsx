const clients = [
  "Dr. Peanut",
  "Brownie da Buu",
  "Dark Suplementos",
  "Luka Editora",
  "Yes Energy",
  "Cerberus®",
  "Sault Nutrition",
  "The Last Viking",
]

export function ClientsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="mb-12">
        <span className="label-mono text-primary">Confiam no estúdio</span>
        <h2 className="mt-4 font-display text-4xl uppercase md:text-5xl">
          Clientes & parcerias
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
        {clients.map((c) => (
          <div
            key={c}
            className="flex h-28 items-center justify-center bg-card p-4 text-center transition-colors duration-300 hover:bg-secondary"
          >
            <span className="font-display text-lg uppercase tracking-tight text-muted-foreground transition-colors hover:text-foreground md:text-xl">
              {c}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
