import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
 
const plusJakartaSans = Plus_Jakarta_Sans({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Rob Bettison',
  description: 'Welcome to Rob Bettison\'s Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <Header></Header>
          {children}
          <Footer></Footer>
        </body>
    </html>
  )
}
