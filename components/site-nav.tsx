"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Pacotes", href: "#pacotes" },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#topo" className="flex items-center gap-3" aria-label="OPOLZ Studio — início">
          <Image
            src="/brand/opolz-red.png"
            alt="OPOLZ Studio"
            width={1252}
            height={768}
            className="h-8 w-auto"
            priority
          />
          <span className="label-mono hidden text-muted-foreground sm:inline">STUDIO®</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="label-mono text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contato"
          className="group flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground transition-transform duration-300 hover:scale-105"
        >
          <span className="label-mono">Contato</span>
        </a>
      </nav>
    </header>
  )
}
