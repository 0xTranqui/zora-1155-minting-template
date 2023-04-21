import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from './../components'
import { AppWrapper } from './../components'

function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Header />
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default App
