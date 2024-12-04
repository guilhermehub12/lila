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
      const target = e.currentTarget as HTMLAnchorElement
      const id = target.getAttribute('href')
      
      if (!id?.startsWith('#')) return
      
      e.preventDefault()
      const element = document.querySelector(id)
      
      if (!element) return
      
      const options: ScrollIntoViewOptions = {
        behavior: 'smooth',
        block: 'start',
      }
      
      element.scrollIntoView(options)
    }
  
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    
    anchors.forEach(anchor => {
      anchor.addEventListener('click', smoothScroll)
    })
  
    return () => {
      anchors.forEach(anchor => {
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

