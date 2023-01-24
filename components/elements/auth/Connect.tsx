import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit'

export default function Connect({ connectCopy, ...props }: {connectCopy?: string | JSX.Element}) {
  return (
    <div
      className="relative"
      {...props}
    >
      <RKConnectButton.Custom>
        {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
          return (
            <>
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <button className="connect__button" onClick={openConnectModal}>
                      {connectCopy ? connectCopy : 'connect'}
                    </button>
                  )
                }
                if (chain.unsupported) {
                  return <p>&#x26A0; Wrong Network</p>
                }
                return (
                  <button onClick={openAccountModal}>
                    <div className="flex items-center gap-2 text-sm">
                      {account.displayName}
                    </div>
                  </button>
                )
              })()}
            </>
          )
        }}
      </RKConnectButton.Custom>
    </div>
  )
}