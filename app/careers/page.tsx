import type { Metadata } from 'next'
import { Careers } from '@/components/Careers'

export const metadata: Metadata = {
  title: 'Carrières chez Stacbase | Careers at Stacbase',
  description: 'Découvrez la mission de Stacbase et suivez nos actualités de recrutement. Explore the Stacbase mission and follow our hiring news.',
  alternates: { canonical: 'https://stacbase.com/careers' },
  openGraph: {
    title: 'Carrières chez Stacbase',
    description: 'Construisons un espace de travail plus simple pour les équipes marketing.',
    url: 'https://stacbase.com/careers',
    images: [{ url: '/media/stacbase-logo-poster.jpg', width: 1600, height: 400, alt: 'Stacbase' }],
  },
}

export default function CareersPage() {
  return <Careers />
}
