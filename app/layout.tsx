import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Fraunces, Poppins, Space_Grotesk } from 'next/font/google'
import './globals.css'

// Même police que l'application : le passage du site à l'app ne change pas
// de voix.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
})

// L'accueil et la page betting (« Use. Pay. Co-own. ») : Fraunces pour les
// titres, Space Grotesk pour le texte.
const fraunces = Fraunces({ subsets: ['latin'], display: 'swap', variable: '--font-serif', axes: ['opsz'] })
const grotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-grotesk' })

/** Propriété Google Analytics de stacbase.com. */
const GA_ID = 'G-WNVSXRG6ZC'

export const metadata: Metadata = {
  metadataBase: new URL('https://stacbase.com'),
  title: 'Stacbase – Use. Pay. Co-own.',
  description:
    'Built for digital marketers, owned by them. 25+ tools in one workspace (ads, CRM, publishing, mailing, invoices, docs), one membership from $0, and co-ownership shares on Pro and Large.',
  icons: { icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon.png', type: 'image/png' }], apple: '/apple-touch-icon.png' },
  openGraph: {
    title: 'Stacbase – Use. Pay. Co-own.',
    description: 'Built for digital marketers. Owned by them.',
    images: [{ url: '/media/stacbase-logo-poster.jpg', width: 1600, height: 400, alt: 'Stacbase' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#faf6f2',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${poppins.variable} ${fraunces.variable} ${grotesk.variable}`}>
      <head>
        {/* Balise Google (GA4) du site : suivi du trafic de stacbase.com. Chargée
            après l'affichage, pour ne pas retarder la première vue. */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy='afterInteractive' />
        <Script id='ga4' strategy='afterInteractive'>
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
