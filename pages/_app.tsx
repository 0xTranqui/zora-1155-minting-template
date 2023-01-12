import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from './../components'

function NetLabel({ Component, pageProps }: AppProps) {
  return (
    // <AppWrapper>
      <div>
        <Header />
        <main className="px-6">
          <Component {...pageProps} />
        </main>
      </div>
    // </AppWrapper>
  )
}

export default NetLabel
