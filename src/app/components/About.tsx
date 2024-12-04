'use client'

import Image from 'next/image'
import { FaCheck } from 'react-icons/fa'
import { motion, Variants } from 'framer-motion'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
}

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8 }
  }
}

const buttonVariants: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
}

export default function About() {
  return (
    <section id="About" className="py-20 px-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            viewport={{ once: true }}
            className="w-full lg:w-5/12 px-4 mr-auto ml-auto mb-8 lg:mb-0"
          >
            <div className="text-pink-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-100">
              <FaCheck className="text-xl" />
            </div>
            <h3 className="text-3xl mb-2 font-semibold leading-normal">
              Nossa jornada começou com uma ideia simples
            </h3>
            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
              Trazer alegria e sorrisos aos rostos das pessoas através de nossos deliciosos cupcakes. 
              O que começou como um pequeno empreendimento de confeitaria em casa agora floresceu em um paraíso de cupcakes onde sabores, 
              cores e arte se unem em perfeita harmonia.
            </p>
            <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
              Temos orgulho de nosso compromisso com a qualidade, usando apenas os melhores ingredientes para criar cupcakes 
              que não só parecem incríveis, mas também têm um sabor celestial. Junte-se a nós para celebrar a magia dos cupcakes 
              e a alegria que eles trazem a cada ocasião.
            </p>
            <motion.a 
              href="#" 
              className="font-bold text-pink-500 mt-8"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Leia Mais
            </motion.a>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={imageVariants}
            viewport={{ once: true }}
            className="w-full lg:w-4/12 px-4 mr-auto ml-auto"
          >
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-500">
              <Image 
                alt="Cupcake" 
                src="/img/Cupcake_about.jpg" 
                className="w-full align-middle rounded-t-lg" 
                width={400} 
                height={400} 
              />
              <blockquote className="relative p-8 mb-4">
                <svg 
                  preserveAspectRatio="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 583 95" 
                  className="absolute left-0 w-full block" 
                  style={{height: "95px", top: "-94px"}}
                >
                  <polygon 
                    points="-30,95 583,95 583,65" 
                    className="text-pink-500 fill-current"
                  />
                </svg>
                <h4 className="text-xl font-bold text-white">
                  Serviços de Primeira Classe
                </h4>
                <p className="text-md font-light mt-2 text-white">
                  Nosso compromisso com a excelência garante que cada cupcake seja uma obra-prima de sabor e design.
                </p>
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}