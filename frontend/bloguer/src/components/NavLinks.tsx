'use client'

import { useAppSelector } from '@/lib/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavLinks() {
  const pathname = usePathname()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  return (
    <nav className='uppercase h-10 px-5 flex items-center space-x-4 text-sm text-gray-400 border-b border-slate-700 font-semibold'>
      <Link className={`link hover:text-white ${pathname === '/' ? 'text-white' : 'text-gray-400'}`} href="/">
        Home
      </Link>
      {isAuthenticated ? (
        <Link className={`link hover:text-white ${pathname === '/auth/logout' ? 'text-white' : 'text-gray-400'}`} href="/auth/logout">
          Logout
        </Link>
      ) : (
        <Link className={`link hover:text-white ${pathname === '/auth/login' ? 'text-white' : 'text-gray-400'}`} href="/auth/login">
          Login
        </Link>
      )
      }
    </nav>
  )
}