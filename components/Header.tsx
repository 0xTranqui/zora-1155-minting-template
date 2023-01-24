import dynamic from 'next/dynamic'
import { ConnectButton} from '@rainbow-me/rainbowkit'

const DisconnectButton = dynamic(() => import('./elements/auth/Disconnect'), {
  ssr: false,
})

const Connect = dynamic(() => import('./elements/auth/Connect'), {
  ssr: false,
})

import { Navigation } from './Navigation'

export function Header() {

  return (
    <header className="flex flex-col justify-center items-center md:flex-row md:justify-center md:items-center w-full px-6 gap-2">
      <Navigation />
      <div className="fixed top-4 right-4">
        <Connect /> 
        {/* <ConnectButton /> */}
      </div>
    </header>
  )
}
