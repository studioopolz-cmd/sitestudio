import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/opolz-red.png"
            alt="OPOLZ Studio"
            width={1252}
            height={768}
            className="h-9 w-auto"
          />
          <span className="label-mono text-muted-foreground">STUDIO®</span>
        </div>

        <p className="label-mono text-muted-foreground">
          Marcas com atitude — Creative Studio
        </p>

        <div className="flex items-center gap-6">
          <span className="label-mono text-muted-foreground">Brasil</span>
          <span className="label-mono text-primary">2026</span>
        </div>
      </div>
    </footer>
  )
}
