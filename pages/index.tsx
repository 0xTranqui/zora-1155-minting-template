import type { NextPage } from 'next'
import { useMint } from '../hooks/useMint'

const Home: NextPage = () => {
  const { write, data, isError, isLoading, isSuccess, status } = useMint()

  return (
    <div className="flex items-center justify-center h-screen pb-48">
      <button
        disabled={isLoading}
        onClick={() => write?.()}
        className="border-[1px] border-black px-3 py-1 rounded hover:bg-black hover:text-white">
        Mint
      </button>
    </div>
  )
}

export default Home
