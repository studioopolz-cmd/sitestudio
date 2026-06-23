"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const REST = 0.16 // canto levantado por padrão, convidando a descolar

// ruído fino para textura de vinil
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")"

// frente do adesivo: ruído + brilho especular + estrias escovadas + base metálica
const FRONT_BG = [
  NOISE,
  "linear-gradient(115deg, transparent 36%, rgba(255,255,255,0.5) 47%, transparent 57%)",
  "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, rgba(0,0,0,0.05) 1px 3px)",
  "linear-gradient(135deg, #9aa0ab 0%, #d8dce2 42%, #80868f 100%)",
].join(", ")

// verso da aba: ruído + gradiente cilíndrico (crista de luz na dobra → sombra → tip)
const FLAP_BG = [
  NOISE,
  "linear-gradient(135deg, rgba(70,75,85,0.55) 0%, #c4c9d1 7%, #ffffff 26%, #e6e9ee 50%, #c2c7cf 74%, #f2f4f8 100%)",
].join(", ")

export function StickerPeel() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const [k, setK] = useState(REST)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect()
      setSize({ w: r.width, h: r.height })
    })
    ro.observe(el)

    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width
      const ny = (e.clientY - r.top) / r.height
      setK(Math.min(2, Math.max(REST, nx + ny)))
    }
    const onUp = () => {
      // comporta como adesivo: fica onde foi deixado
      draggingRef.current = false
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerup", onUp)
    return () => {
      ro.disconnect()
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [])

  const onDown = () => {
    draggingRef.current = true
  }
  const reset = () => setK(REST)

  const { w, h } = size
  // 1ª metade: abinha de canto cresce. 2ª metade: adesivo inteiro se levanta e sai.
  const kc = Math.min(1, k) // progresso da abinha (corte/clip)
  const lift = Math.max(0, k - 1) // progresso de "descolar de vez" (0→1)

  // parte ainda colada (corte reto = linha da dobra)
  const frontClip = `polygon(${kc * 100}% 0, 100% 0, 100% 100%, 0 100%, 0 ${kc * 100}%)`

  // aba enrolada: borda externa curva (Bézier) com tip arredondado
  let flapPath: string | undefined
  if (w && h) {
    const ax = kc * w
    const ay = kc * h
    const denom = ax * ax + ay * ay || 1
    const tx = (2 * ax * ay * ay) / denom // reflexão do canto (0,0) sobre a dobra
    const ty = (2 * ax * ax * ay) / denom
    const cx = tx + 0.35 * (tx - ax / 2) // controle além do tip → curva o rolo
    const cy = ty + 0.35 * (ty - ay / 2)
    const f = (n: number) => n.toFixed(1)
    flapPath = `path('M ${f(ax)} 0 L 0 ${f(ay)} Q ${f(cx)} ${f(cy)} ${f(ax)} 0 Z')`
  }

  const smooth = draggingRef.current
    ? "none"
    : "clip-path 350ms ease, transform 350ms ease"
  // transform do adesivo inteiro quando passa do meio (levanta e sai pela diagonal)
  const stickerStyle = {
    transform: lift
      ? `translate(${(lift * 42).toFixed(1)}%, ${(lift * 32).toFixed(1)}%) rotate(${(lift * 8).toFixed(1)}deg) scale(${(1 + lift * 0.04).toFixed(3)})`
      : "none",
    transformOrigin: "62% 62%",
    transition: smooth,
    pointerEvents: lift >= 1 ? ("none" as const) : ("auto" as const),
  }
  const peeled = k > REST + 0.04

  return (
    <section className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <div
          ref={wrapRef}
          className="relative mx-auto aspect-[16/7] w-full select-none overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background to-card"
        >
          {/* mensagem revelada por baixo */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center md:gap-7">
            <h2 className="font-display text-balance text-3xl uppercase leading-[0.95] sm:text-4xl md:text-5xl lg:text-6xl">
              Revele o <span className="text-primary">potencial</span> da sua marca
            </h2>
            <Image
              src="/brand/opolz-red.png"
              alt="OPOLZ Studio"
              width={1252}
              height={768}
              priority
              className="h-auto w-32 object-contain opacity-80 md:w-40"
            />
          </div>

          {/* adesivo inteiro (frente + aba) */}
          <div className="absolute inset-0" style={stickerStyle}>
            {/* frente do adesivo (parte colada) */}
            <div
              onPointerDown={onDown}
              className="absolute inset-0 cursor-grab touch-none select-none active:cursor-grabbing"
              style={{
                clipPath: frontClip,
                background: FRONT_BG,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 0 0 1px rgba(255,255,255,0.16), inset 0 -12px 24px rgba(0,0,0,0.22)",
                filter: "drop-shadow(2px 3px 6px rgba(0,0,0,0.35))",
                transition: smooth,
              }}
            >
              <div className="flex h-full w-full items-center justify-center">
                <span className="label-mono text-[clamp(0.7rem,2.5vw,1rem)] font-semibold text-black/55">
                  DESCOLE PARA REVELAR
                </span>
              </div>
            </div>

            {/* aba enrolada (verso), por cima da folha */}
            {flapPath && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  clipPath: flapPath,
                  background: FLAP_BG,
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
                  filter: "drop-shadow(2px 3px 6px rgba(0,0,0,0.4))",
                  transition: smooth,
                }}
              />
            )}
          </div>

          {peeled && (
            <button
              onClick={reset}
              className="absolute bottom-3 right-3 rounded-full border border-border bg-background/80 px-3 py-1 backdrop-blur transition-colors hover:bg-secondary"
            >
              <span className="label-mono text-muted-foreground">Colar de novo</span>
            </button>
          )}
        </div>
        <p className="mt-4 text-center label-mono text-muted-foreground">
          Puxe o canto na diagonal
        </p>
      </div>
    </section>
  )
}
