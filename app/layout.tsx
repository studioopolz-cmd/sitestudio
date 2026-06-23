import type { Metadata } from 'next'
import { Archivo, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const siteUrl = 'https://opolzstudio.com.br'
const siteName = 'OPOLZ STUDIO'
const description =
  'Estúdio criativo brasileiro. Não criamos apenas visuais — construímos presença para marcas que querem ser lembradas. Branding, 3D para produtos e campanhas visuais.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'OPOLZ STUDIO — Marcas com Atitude | Branding & 3D',
    template: '%s | OPOLZ STUDIO',
  },
  description,
  keywords: [
    'estúdio criativo',
    'branding',
    'identidade visual',
    '3D para produtos',
    'packaging',
    'design de embalagem',
    'campanhas visuais',
    'direção de arte',
    'logo',
    'marca',
    'Brasil',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName,
    title: 'OPOLZ STUDIO — Marcas com Atitude',
    description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OPOLZ STUDIO — Marcas com Atitude',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPOLZ STUDIO — Marcas com Atitude',
    description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: siteName,
              url: siteUrl,
              logo: `${siteUrl}/icon.png`,
              description,
              areaServed: 'BR',
              sameAs: ['https://www.instagram.com/opolzstudio/'],
            }),
          }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
