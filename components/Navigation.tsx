import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import zorbDevil from "../public/assets/ZorbDevil.png"

const pages = [
  {
    slug: '/',
    title: 'Private Destruction',
  },  
]

export function Navigation() {
  const router = useRouter()

  return (
    <nav className="flex flex-row items-center gap-8">
      <div className="flex flex-row items-center gap-4">
          <Image 
            src={zorbDevil}
            width="50"
            height="50"
          />
        {pages.map((page) => (
          <Link passHref href={page.slug} key={page.slug}>
            {/* <a
              className="hover:underline"
              style={{
                fontWeight: router.asPath === page.slug ? 'bold' : 'normal',
              }}>
              {page.title}
            </a> */}
            <div
              className=""
              style={{
                fontWeight: router.asPath === page.slug ? 'bold' : 'normal',
              }}>
              {page.title}
            </div>            
          </Link>
        ))}
        <a
          className="hover:underline"
          href="https://twitter.com/destroymore"
        >
          twitter
        </a>
        {/* <a
          className="hover:underline"
          href="https://nouns.build/dao/0xd2e7684cf3e2511cc3b4538bb2885dc206583076/vote/0xe2e4a8a72d30358011e514b30d9d18a5317a063c43ed214c47b38f1ac6d336d6"
        >
          proposal
        </a>         */}
      </div>
    </nav>
  )
}
