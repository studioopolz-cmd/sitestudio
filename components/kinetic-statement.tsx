"use client"

import { useEffect, useRef, useState } from "react"

const STATEMENT =
  "A maioria das marcas é esquecida. As que a gente cria, não. Branding, 3D e sites feitos para o mercado parar — e lembrar."

const words = STATEMENT.split(" ")
const RADIUS = 180 // raio de influência do cursor, em px

export function KineticStatement() {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const centers = useRef<{ x: number; y: number }[]>([])
  const [intensity, setIntensity] = useState<number[]>(() => words.map(() => 0))

  useEffect(() => {
    const measure = () => {
      centers.current = wordRefs.current.map((el) => {
        if (!el) return { x: -9999, y: -9999 }
        const r = el.getBoundingClientRect()
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
      })
    }

    let raf = 0
    let mx = -9999
    let my = -9999
    const compute = () => {
      raf = 0
      setIntensity(
        centers.current.map((c) => {
          const d = Math.hypot(c.x - mx, c.y - my)
          return Math.max(0, 1 - d / RADIUS)
        }),
      )
    }
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!raf) raf = requestAnimationFrame(compute)
    }

    measure()
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("scroll", measure, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", measure)
      window.removeEventListener("resize", measure)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-5xl px-5 py-24 md:px-8 md:py-36">
        <p className="font-display text-3xl uppercase leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl">
          {words.map((w, i) => {
            const t = intensity[i] ?? 0
            const pct = Math.round(t * 100)
            return (
              <span
                key={i}
                ref={(el) => {
                  wordRefs.current[i] = el
                }}
                style={{
                  color: `color-mix(in oklab, var(--color-foreground) ${pct}%, var(--color-muted-foreground))`,
                  textShadow:
                    t > 0.05
                      ? `0 0 ${Math.round(t * 24)}px color-mix(in oklab, var(--color-primary) ${pct}%, transparent)`
                      : "none",
                }}
                className="transition-colors duration-150 ease-out"
              >
                {w}{" "}
              </span>
            )
          })}
        </p>
      </div>
    </section>
  )
}
