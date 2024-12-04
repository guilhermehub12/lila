'use client'

import { useState, useEffect } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import BackToTop from './components/BackToTop'
import LoadingSpinner from './components/LoadingSpinner'
import { AnimatePresence } from 'framer-motion'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const smoothScroll = (e: MouseEvent) => {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement
      const id = target.getAttribute('href')
      if (id?.startsWith('#')) {
        const element = document.querySelector(id)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll)
    })

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll)
      })
    }
  }, [])

  return (
    <html lang="pt-BR">
      <head>
        <title>Lila Baking Studio</title>
        <meta name="description" content="Deliciosos bolos e doces personalizados" />
      </head>
      <body className={inter.className}>
        <AnimatePresence>
          {loading ? (
            <LoadingSpinner key="spinner" />
          ) : (
            <>
              {children}
              <BackToTop />
            </>
          )}
        </AnimatePresence>
      </body>
    </html>
  )
}

