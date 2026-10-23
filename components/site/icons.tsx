// Icônes au trait, dessinées pour le site (24 × 24, trait 1,7).
import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }

function Svg({ size = 18, children, ...rest }: P) {
  return (
    <svg
      viewBox='0 0 24 24'
      width={size}
      height={size}
      fill='none'
      stroke='currentColor'
      strokeWidth='1.7'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  )
}

export const ArrowUpRight = (p: P) => <Svg {...p}><path d='M7 17 17 7M8 7h9v9' /></Svg>
export const ArrowRight = (p: P) => <Svg {...p}><path d='M5 12h14M13 6l6 6-6 6' /></Svg>
export const ArrowDown = (p: P) => <Svg {...p}><path d='M12 5v14M6 13l6 6 6-6' /></Svg>
export const Check = (p: P) => <Svg {...p}><path d='m5 12.5 4.5 4.5L19 7.5' /></Svg>
export const Plus = (p: P) => <Svg {...p}><path d='M12 5v14M5 12h14' /></Svg>
export const Sparkle = (p: P) => <Svg {...p}><path d='M12 3.5c.6 4.3 2.2 6 6.5 6.5-4.3.6-5.9 2.2-6.5 6.5-.6-4.3-2.2-5.9-6.5-6.5 4.3-.5 5.9-2.2 6.5-6.5Z' /><path d='M18.5 15.5c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5Z' /></Svg>
export const Megaphone = (p: P) => <Svg {...p}><path d='M4 10v4a1 1 0 0 0 1 1h2l5 4V5L7 9H5a1 1 0 0 0-1 1Z' /><path d='M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12' /></Svg>
export const Chat = (p: P) => <Svg {...p}><path d='M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z' /><path d='M9 11.5h.01M12.5 11.5h.01M16 11.5h.01' /></Svg>
export const Users = (p: P) => <Svg {...p}><circle cx='9' cy='8.5' r='3.5' /><path d='M3 19.5c.7-3.2 3-5 6-5s5.3 1.8 6 5' /><path d='M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.8c1.6.6 2.6 2.2 3 4.7' /></Svg>
export const Chart = (p: P) => <Svg {...p}><path d='M4 20V4M4 20h16' /><path d='M8 16v-4M12 16V8M16 16v-6M20 16v-9' /></Svg>
export const Mail = (p: P) => <Svg {...p}><rect x='3' y='5' width='18' height='14' rx='3' /><path d='m4 7 8 6 8-6' /></Svg>
export const Doc = (p: P) => <Svg {...p}><path d='M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z' /><path d='M14 3v5h5M9 13h6M9 17h4' /></Svg>
export const Pen = (p: P) => <Svg {...p}><path d='M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z' /><path d='m13.5 6.5 4 4' /></Svg>
export const Calendar = (p: P) => <Svg {...p}><rect x='3.5' y='5' width='17' height='15' rx='3' /><path d='M3.5 10h17M8 3v4M16 3v4' /></Svg>
export const Globe = (p: P) => <Svg {...p}><circle cx='12' cy='12' r='8.5' /><path d='M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z' /></Svg>
export const Bolt = (p: P) => <Svg {...p}><path d='M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z' /></Svg>
export const Layers = (p: P) => <Svg {...p}><path d='m12 3 9 5-9 5-9-5 9-5Z' /><path d='m3 13 9 5 9-5' /></Svg>
export const Rocket = (p: P) => <Svg {...p}><path d='M5 15c-1.5 1-2 3.5-2 6 2.5 0 5-.5 6-2' /><path d='M9 15 6.5 12.5C8 7 12 4 20 4c0 8-3 12-8.5 13.5L9 15Z' /><circle cx='15' cy='9' r='1.6' /></Svg>
export const Clock = (p: P) => <Svg {...p}><circle cx='12' cy='12' r='8.5' /><path d='M12 7.5V12l3 2' /></Svg>
export const Search = (p: P) => <Svg {...p}><circle cx='11' cy='11' r='6.5' /><path d='m20 20-4.2-4.2' /></Svg>
export const Bell = (p: P) => <Svg {...p}><path d='M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z' /><path d='M10 20.5a2 2 0 0 0 4 0' /></Svg>
export const Home = (p: P) => <Svg {...p}><path d='m4 11 8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H5.5A1.5 1.5 0 0 1 4 19v-8Z' /></Svg>
export const Wallet = (p: P) => <Svg {...p}><rect x='3' y='6' width='18' height='14' rx='3' /><path d='M3 10h18M16 15h2' /></Svg>
export const Heart = (p: P) => <Svg {...p}><path d='M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.5 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z' /></Svg>
export const Compass = (p: P) => <Svg {...p}><circle cx='12' cy='12' r='8.5' /><path d='m15.5 8.5-2 5-5 2 2-5 5-2Z' /></Svg>
export const Phone = (p: P) => <Svg {...p}><rect x='6.5' y='2.5' width='11' height='19' rx='2.5' /><path d='M11 18.5h2' /></Svg>
export const Image = (p: P) => <Svg {...p}><rect x='3.5' y='4.5' width='17' height='15' rx='3' /><circle cx='9' cy='10' r='1.8' /><path d='m20.5 16-5-5-8.5 8.5' /></Svg>
export const Thumb = (p: P) => <Svg {...p}><path d='M7.5 11v9h-3v-9h3ZM7.5 11l4-7.5c1.5 0 2.5 1 2.5 2.5v3h5a2 2 0 0 1 2 2.3l-1.2 6.5a2 2 0 0 1-2 1.7H7.5' /></Svg>
export const Quote = (p: P) => <Svg {...p}><path d='M9.5 7H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2.5v1.5A2.5 2.5 0 0 1 6 18M20 7h-3.5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2H19v1.5a2.5 2.5 0 0 1-2.5 2.5' /></Svg>

export function InstagramIcon(p: P) {
  return (
    <Svg {...p}>
      <rect x='3.5' y='3.5' width='17' height='17' rx='5' />
      <circle cx='12' cy='12' r='4' />
      <path d='M17.3 6.7h.01' strokeWidth='2.4' />
    </Svg>
  )
}

export function LinkedInIcon(p: P) {
  return (
    <Svg {...p}>
      <path d='M5.5 9.5v9.5M5.5 5.3v.2' />
      <path d='M10 19V9.5M10 13.4c0-2.3 1.5-4 3.7-4 2.3 0 3.4 1.5 3.4 4.2V19' />
    </Svg>
  )
}
