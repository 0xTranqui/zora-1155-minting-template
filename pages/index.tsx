import type { NextPage } from 'next'
import { useMint } from '../hooks/useMint'

const Home: NextPage = () => {
  const {
    write,
    data,
    error: writeError,
    isError,
    isLoading,
    isSuccess,
    status,
  } = useMint()

  return (
    <>
      <section id="home-page" className="pb-6 flex flex-row justify-center h-screen">
        <div className="w-full flex flex-row justify-center items-center">
          <button
            onClick={() => write?.()}
            className="border-[1px] border-black px-4 py-2 hover:bg-black hover:text-white">
            Mint
          </button>
        </div>
      </section>
    </>
  )
}

export default Home
