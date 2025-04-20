import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faShoppingBasket, faUserCog } from '@fortawesome/free-solid-svg-icons'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bulk Ordering Platform',
  description: 'A platform for bulk ordering of vegetables and fruits',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-green-600 text-white shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Fresh Bulk Orders</h1>
            <div className="space-x-4">
              <Link href="/" className="hover:text-green-200 flex items-center gap-2">
                <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
                Products
              </Link>
              <Link href="/orders" className="hover:text-green-200 flex items-center gap-2">
                <FontAwesomeIcon icon={faShoppingBasket} className="w-4 h-4" />
                Track Order
              </Link>
              <Link href="/admin" className="hover:text-green-200 flex items-center gap-2">
                <FontAwesomeIcon icon={faUserCog} className="w-4 h-4" />
                Admin
              </Link>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}