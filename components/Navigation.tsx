import Link from 'next/link'
import { useRouter } from 'next/router'

const pages = [
  {
    slug: '/',
    title: 'home',
  },
]

export function Navigation() {
  const router = useRouter()

  return (
    <nav>
      {pages.map((page) => (
        <Link passHref href={page.slug} key={page.slug}>
          <div
            className={`${router.asPath === page.slug ? 'underline' : 'no-underline'}`}>
            {page.title}
          </div>
        </Link>
      ))}
    </nav>
  )
}
