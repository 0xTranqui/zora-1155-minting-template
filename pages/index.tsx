import type { NextPage } from 'next'
import { Seo } from 'components'
import MainFeed from 'components/Feed/MainFeed';
import dynamic from 'next/dynamic';

const Home: NextPage = () => {
  return (
    <>
      <section id="home-page" className="pb-6 flex flex-row justify-center h-screen">
        <MainFeed />
      </section>
      {/* <Seo/> */}
    </>
  )
}

export default Home
