import type { Metadata } from 'next'
import { AdafriStory } from '@/components/AdafriStory'

export const metadata: Metadata = {
  title: 'Adafri devient Stacbase — Un nouveau chapitre',
  description: 'De la publicité à un espace de travail partagé : découvrez comment Adafri évolue avec Stacbase, pour les agences, freelances et équipes marketing.',
  alternates: { canonical: 'https://stacbase.com/adafri' },
  openGraph: {
    title: 'Adafri devient Stacbase',
    description: 'Une histoire commencée avec la publicité. Une ambition qui grandit avec vous.',
    url: 'https://stacbase.com/adafri',
    images: [{ url: '/media/stacbase-logo-poster.jpg', width: 1600, height: 400, alt: 'Stacbase' }],
  },
}

export default function AdafriPage() {
  return <AdafriStory />
}
