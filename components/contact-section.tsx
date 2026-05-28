import { Star } from "@/components/star"

export function ContactSection() {
  return (
    <section id="contato" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 py-24 text-center md:px-8 md:py-36">
        <Star className="mx-auto size-8 text-primary" />
        <h2 className="mx-auto mt-8 max-w-4xl font-display text-balance text-5xl uppercase leading-[0.95] md:text-7xl lg:text-8xl">
          Pronto para elevar a sua marca?
        </h2>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://wa.me/5541998685110"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-primary-foreground transition-transform duration-300 hover:scale-105"
          >
            <span className="label-mono">(41) 99868-5110</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              {"->"}
            </span>
          </a>
          <a
            href="https://www.instagram.com/opolzstudio/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-full border border-border px-7 py-4 transition-colors duration-300 hover:bg-secondary"
          >
            <span className="label-mono">@opolzstudio</span>
          </a>
        </div>
      </div>
    </section>
  )
}
