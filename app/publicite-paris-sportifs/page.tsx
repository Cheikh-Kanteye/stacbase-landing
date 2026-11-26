import { BettingPage, bettingMetadata } from '@/components/v2/BettingPage'

export const metadata = bettingMetadata('fr')

export default function Page() {
  return <BettingPage lang='fr' />
}
