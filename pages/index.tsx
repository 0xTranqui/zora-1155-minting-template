import type { NextPage } from 'next'
import { Seo } from 'components'
import ConceptDisplay from 'components/layout-v1/ConceptDisplay';

const Home: NextPage = () => {
  return (
    <>
      <Seo/>
      <section id="home-page" className="pb-6">
        <ConceptDisplay />
      </section>
    </>
  )
}

export default Home
