import dynamic from 'next/dynamic'

const Connect = dynamic(() => import('./elements/auth/Connect'), {
  ssr: false,
})

import { Navigation } from './Navigation'

export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <Navigation />
      <Connect />
    </header>
  )
}
