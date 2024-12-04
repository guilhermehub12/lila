'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 } 
  }
}

const buttonHoverVariants: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
}

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      delay: 0.5 
    } 
  }
}

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div 
      className="relative bg-pink-500 pt-16 pb-32 flex flex-col items-center justify-center min-h-screen parallax overflow-hidden" 
      style={{backgroundImage: "url('/img/bg-hero-pink.png')"}}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-center bg-cover">
        <span 
          id="blackOverlay" 
          className="w-full h-full absolute opacity-75 bg-pink-500"
        />
      </div>
      
      <div className="container relative mx-auto px-4 z-10 flex flex-col items-center justify-center h-full">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="w-full lg:w-2/3 text-center mb-12 lg:mb-0"
        >
          <h1 className="text-white font-semibold text-4xl md:text-5xl lg:text-6xl mb-6">
            Delicie-se com Nossos Doces
          </h1>
          
          <p className="mt-4 text-lg text-white mb-8 px-4 md:px-12">
            Experimente o Prazer Mais Doce em Cada Mordida. Descubra um Mundo de Sabores, Arte e Encanto.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {['Explore Nossos Cupcakes', 'Contate-nos'].map((text, index) => (
              <motion.a 
                key={text}
                href="#" 
                className={`
                  font-bold uppercase text-sm px-6 py-3 rounded-full shadow 
                  hover:shadow-lg outline-none focus:outline-none
                  ease-linear transition-all duration-150
                  ${index === 0 
                    ? 'bg-white text-pink-500 active:bg-pink-600' 
                    : 'bg-transparent border-2 border-white text-white active:bg-pink-600'
                  }
                `}
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {text}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={imageVariants}
        className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mt-8 lg:mt-0"
      >
        <Image 
          src="/img/Cupcake_home.png" 
          priority
          alt="Cupcake" 
          width={500} 
          height={500} 
          className="object-contain w-full h-auto" 
        />
      </motion.div>
    </div>
  )
}

