"use client"

import { useState } from "react"
import Image from "next/image"
import { Star } from "@/components/star"

type Work = {
  title: string
  category: string
  image: string
  appreciations: number
}

const works: Work[] = [
  { title: "The Last Viking", category: "Branding", image: "/works/the-last-viking.png", appreciations: 38 },
  { title: "Peanut Butter", category: "3D / Packaging", image: "/works/peanut-butter.png", appreciations: 28 },
  { title: "Alligator Energy", category: "3D / Beverage", image: "/works/alligator-energy.png", appreciations: 14 },
  { title: "We Are Cerberus®", category: "Brand Identity", image: "/works/cerberus.png", appreciations: 6 },
  { title: "Dark Suplementos", category: "Branding / 3D", image: "/works/dark-suplementos.png", appreciations: 10 },
  { title: "Luka Editora", category: "Editorial", image: "/works/luka-editora.png", appreciations: 8 },
  { title: "Donuts", category: "Packaging", image: "/works/donuts.png", appreciations: 7 },
]

export function WorksSection() {
  const [active, setActive] = useState<number | null>(null)
  const center = (works.length - 1) / 2
  const spread = 7 // degrees per card

  return (
    <section id="trabalhos" className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <span className="label-mono text-primary">Portfólio</span>
            <h2 className="mt-4 font-display text-4xl uppercase md:text-5xl">
              Nossos trabalhos
            </h2>
          </div>
          <a
            href="https://www.behance.net/opolzstudio"
            target="_blank"
            rel="noreferrer"
            className="label-mono hidden text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline md:block"
          >
            Portfólio completo {"->"}
          </a>
        </div>
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
          Passe o mouse sobre a mão de cartas para revelar cada projeto.
        </p>
      </div>

      {/* Poker hand fan — large screens */}
      <div className="relative mx-auto mt-4 hidden h-[560px] max-w-7xl items-end justify-center md:flex">
        <div className="relative h-full w-full" onMouseLeave={() => setActive(null)}>
          {works.map((w, i) => {
            const offset = i - center
            const angle = offset * spread
            const offsetX = offset * 120
            const arcY = Math.abs(offset) * Math.abs(offset) * 10
            const isActive = active === i
            const dim = active !== null && !isActive

            return (
              <button
                key={w.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group absolute bottom-6 left-1/2 aspect-[5/7] w-[230px] origin-bottom cursor-pointer rounded-2xl border border-border bg-card shadow-2xl outline-none transition-all duration-500 ease-out focus-visible:ring-2 focus-visible:ring-primary"
                style={{
                  transform: isActive
                    ? `translateX(calc(-50% + ${offsetX * 0.5}px)) translateY(-60px) rotate(0deg) scale(1.08)`
                    : `translateX(calc(-50% + ${offsetX}px)) translateY(${arcY}px) rotate(${angle}deg)`,
                  zIndex: isActive ? 50 : i,
                  opacity: dim ? 0.45 : 1,
                  filter: dim ? "saturate(0.6) brightness(0.7)" : "none",
                }}
                aria-label={`${w.title} — ${w.category}`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    src={w.image || "/placeholder.svg"}
                    alt={w.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="230px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                  <Star className="absolute right-3 top-3 size-4 text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <span className="label-mono text-primary">{w.category}</span>
                    <h3 className="mt-1 font-display text-lg uppercase leading-tight">
                      {w.title}
                    </h3>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Mobile carousel */}
      <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {works.map((w) => (
          <article
            key={w.title}
            className="relative aspect-[5/7] w-[68vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-card"
          >
            <Image
              src={w.image || "/placeholder.svg"}
              alt={w.title}
              fill
              className="object-cover"
              sizes="68vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <span className="label-mono text-primary">{w.category}</span>
              <h3 className="mt-1 font-display text-lg uppercase">{w.title}</h3>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-7xl px-5 md:hidden">
        <a
          href="https://www.behance.net/opolzstudio"
          target="_blank"
          rel="noreferrer"
          className="label-mono text-muted-foreground underline underline-offset-4"
        >
          Portfólio completo {"->"}
        </a>
      </div>
    </section>
  )
}
