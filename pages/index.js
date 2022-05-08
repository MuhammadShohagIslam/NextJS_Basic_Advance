import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h2>This is home page</h2>

      <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/blog/2020">Blog</Link></li>
          <li><Link href="/clients">Client</Link></li>
      </ul>
    </>
  )
}
