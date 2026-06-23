"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Star } from "@/components/star"

type Work = {
  title: string
  category: string
  image: string
}

const works: Work[] = [
  { title: "Sault Nutrition", category: "Branding / 3D", image: "/works/sault.png" },
  { title: "We Are Cerberus®", category: "Brand Identity", image: "/works/cerberus.png" },
  { title: "Dark Suplementos", category: "Branding / 3D", image: "/works/dark-suplementos.png" },
  { title: "Yes Energy", category: "3D / Beverage", image: "/works/yes-energy.png" },
  { title: "Luka Editora", category: "Editorial", image: "/works/luka-editora.png" },
  { title: "Bee Culture", category: "Branding / Merch", image: "/works/bee-culture.png" },
  { title: "Brownie da Buu", category: "Mascot / Branding", image: "/works/brownie-da-buu.png" },
]

function Card({ w, priority }: { w: Work; priority?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <Image
        src={w.image || "/placeholder.svg"}
        alt={`${w.title} — ${w.category}`}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 768px) 80vw, 240px"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
      <Star className="absolute right-3 top-3 size-4 text-primary" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-left">
        <span className="label-mono text-primary">{w.category}</span>
        <h3 className="mt-1 font-display text-lg uppercase leading-tight text-foreground">
          {w.title}
        </h3>
      </div>
    </div>
  )
}

/* ---------------- Desktop: static fan, hover lifts in place ---------------- */
function DesktopFan() {
  const [active, setActive] = useState<number | null>(null)
  const center = (works.length - 1) / 2
  const spread = 6 // degrees per card
  const gap = 152 // horizontal px between card centers

  return (
    <div
      className="relative mx-auto mt-8 hidden h-[600px] max-w-7xl items-end justify-center md:flex"
      onMouseLeave={() => setActive(null)}
    >
      {works.map((w, i) => {
        const offset = i - center
        const angle = offset * spread
        const x = offset * gap
        const arcY = Math.abs(offset) * Math.abs(offset) * 8
        const isActive = active === i
        const dim = active !== null && !isActive

        return (
          <button
            key={w.title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className="absolute bottom-0 left-1/2 -ml-[120px] aspect-[5/7] w-[240px] origin-bottom cursor-pointer rounded-2xl border border-border bg-card shadow-2xl outline-none transition-[transform,opacity,filter] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-primary"
            style={{
              // Only the vertical lift, rotation reset and scale change on hover.
              // Horizontal position (x) never changes, so the card can't slide
              // out from under the cursor — eliminating the hover flickering.
              transform: `translateX(${x}px) translateY(${isActive ? -52 : arcY}px) rotate(${isActive ? 0 : angle}deg) scale(${isActive ? 1.06 : 1})`,
              zIndex: isActive ? 99 : i,
              opacity: dim ? 0.4 : 1,
              filter: dim ? "brightness(0.6) saturate(0.7)" : "none",
              willChange: "transform",
            }}
            aria-label={`${w.title} — ${w.category}`}
          >
            <Card w={w} priority={i < 3} />
          </button>
        )
      })}
    </div>
  )
}

/* ---------------- Mobile: infinite swipeable card stack ---------------- */
function MobileDeck() {
  const [order, setOrder] = useState<number[]>(() => works.map((_, i) => i))
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef<number | null>(null)
  const dragX = useRef(0)

  const onDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
    dragX.current = 0
    setDragging(true)
    setDrag(0)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onMove = (e: React.PointerEvent) => {
    if (startX.current === null) return
    dragX.current = e.clientX - startX.current
    setDrag(dragX.current)
  }
  const onUp = () => {
    if (startX.current === null) return
    const d = dragX.current
    startX.current = null
    setDragging(false)
    if (Math.abs(d) > 80) {
      const dir = d > 0 ? 1 : -1
      setDrag(dir * 600) // fling the card off-screen
      window.setTimeout(() => {
        setOrder((o) => [...o.slice(1), o[0]])
        setDrag(0)
      }, 280)
    } else {
      setDrag(0) // snap back
    }
  }

  return (
    <div className="md:hidden">
      <div
        className="relative mx-auto mt-8 h-[68vh] max-h-[480px] w-[80vw] max-w-[340px] touch-pan-y select-none"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {order.map((wi, pos) => {
          const w = works[wi]
          const isTop = pos === 0
          const visible = pos < 3
          const transform = isTop
            ? `translateX(${drag}px) rotate(${drag * 0.035}deg)`
            : `translateY(${pos * 16}px) scale(${1 - pos * 0.05})`

          return (
            <article
              key={w.title}
              className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
              style={{
                transform,
                zIndex: works.length - pos,
                opacity: visible ? 1 : 0,
                transition:
                  isTop && dragging
                    ? "none"
                    : "transform 280ms ease-out, opacity 280ms ease-out",
                willChange: "transform",
              }}
            >
              <Card w={w} priority={pos === 0} />
            </article>
          )
        })}
      </div>

      <div className="mx-auto mt-6 flex w-[80vw] max-w-[340px] items-center justify-between">
        <span className="label-mono text-muted-foreground">
          Arraste para o lado
        </span>
        <span className="label-mono text-primary">
          {String(order[0] + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  )
}

export function WorksSection() {
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
          <span className="hidden md:inline">
            Passe o mouse sobre a mão de cartas para revelar cada projeto.
          </span>
          <span className="md:hidden">
            Deslize as cartas para o lado para explorar cada projeto.
          </span>
        </p>
      </div>

      <DesktopFan />
      <MobileDeck />

      <div className="mx-auto mt-10 max-w-7xl px-5 md:hidden">
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
