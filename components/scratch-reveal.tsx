"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

export function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const paintCover = () => {
      const { width, height } = wrap.getBoundingClientRect()
      if (!width || !height) return
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.globalCompositeOperation = "source-over"
      // superfície metálica escovada (ecoa a caixa do hero)
      const g = ctx.createLinearGradient(0, 0, width, height)
      g.addColorStop(0, "#8a8f99")
      g.addColorStop(0.5, "#c7ccd4")
      g.addColorStop(1, "#6d727b")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = "rgba(18,18,20,0.5)"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      const size = Math.max(13, Math.min(22, width * 0.028))
      ctx.font = `600 ${size}px ui-monospace, SFMono-Regular, Menlo, monospace`
      ctx.fillText("RASPE PARA REVELAR", width / 2, height / 2)
    }

    let drawing = false
    let last: { x: number; y: number } | null = null
    const pointPos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out"
      ctx.lineWidth = 56
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      if (last) {
        ctx.beginPath()
        ctx.moveTo(last.x, last.y)
        ctx.lineTo(x, y)
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(x, y, 28, 0, Math.PI * 2)
      ctx.fill()
      last = { x, y }
    }
    const onDown = (e: PointerEvent) => {
      drawing = true
      last = null
      const p = pointPos(e)
      scratch(p.x, p.y)
      canvas.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!drawing) return
      const p = pointPos(e)
      scratch(p.x, p.y)
    }
    const onUp = () => {
      drawing = false
      last = null
    }

    paintCover()
    const ro = new ResizeObserver(() => paintCover())
    ro.observe(wrap)
    canvas.addEventListener("pointerdown", onDown)
    canvas.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      ro.disconnect()
      canvas.removeEventListener("pointerdown", onDown)
      canvas.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [])

  return (
    <section className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <div
          ref={wrapRef}
          className="relative mx-auto aspect-[16/7] w-full select-none overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background to-card"
        >
          {/* logo revelada por baixo */}
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <Image
              src="/brand/opolz-red.png"
              alt="OPOLZ Studio"
              width={1252}
              height={768}
              priority
              className="h-auto w-3/5 max-w-md object-contain"
            />
          </div>
          {/* camada de raspar */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-default touch-none select-none"
          />
        </div>
        <p className="mt-4 text-center label-mono text-muted-foreground">
          Raspe a superfície com o cursor para revelar a marca
        </p>
      </div>
    </section>
  )
}
