import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

// Même police que l'application : le passage du site à l'app ne change pas
// de voix.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://stacbase.com'),
  title: 'Stacbase — 25+ tools in one system',
  description:
    'The everyday tools for modern digital marketers into one stack: campaigns, WhatsApp, CRM, e-mails, invoices and analytics. This OS doesn’t add another tab. It makes them disappear.',
  icons: { icon: '/icon.png' },
  openGraph: {
    title: 'Stacbase — 25+ tools in one system',
    description: 'The everyday tools for modern digital marketers into one stack.',
    images: [{ url: '/media/stacbase-logo-poster.jpg', width: 1600, height: 400, alt: 'Stacbase' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}
