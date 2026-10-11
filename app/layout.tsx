import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://stacbase.com'),
  title: 'Stacbase — 22+ tools in one system',
  description:
    'The everyday tools for modern digital marketers into one stack. This OS doesn’t add another tab. It makes them disappear.',
  icons: { icon: '/icon.png' },
  openGraph: {
    title: 'Open Stacbase',
    description: 'The everyday tools for modern digital marketers into one stack.',
    images: [{ url: '/media/stacbase-logo-poster.jpg', width: 1600, height: 400, alt: 'Stacbase' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

const CONTRACT = `
THESIS: The page is one switch: a black wordmark that turns into its living materials wherever your cursor pours ink. It refuses the SaaS hero (screenshot, feature grid, logos).
OWN-WORLD: Paper-white field, solid black ink, the logo's own materials (cloud, glass, balloon blue-pink, pearl) only inside the ink; Bricolage Grotesque; one green toggle pill with a cream knob.
STORY: Visitors learn Stacbase folds 22+ tools into one stack for digital marketers, feel the brand by touching it, then flip the switch to sign up.
FIRST VIEWPORT: Headline top-left, toggle CTA top-centre, socials top-right; "Open" over a 90vw black wordmark at centre; tagline with colour-cycling highlight bottom-left; legal links and EN/FR bottom-right.
FORM: Pinned by the user's comp (stacbase-landing.jpeg) and noth.in cursor reveal; seed key: user-pinned.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={bricolage.variable}>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: `<!--${CONTRACT}-->` }} />
        {children}
      </body>
    </html>
  )
}
