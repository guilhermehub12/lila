"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// Type definition for Product
type Product = {
  name: string;
  image: string;
}

// Settings type for Slider configuration
type SliderSettings = {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  responsive: Array<{
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll: number;
    }
  }>;
}

const products: Product[] = [
  { name: 'Bolo de Chocolate', image: '/img/Cupcake_about.jpg' },
  { name: 'Cupcakes Variados', image: '/img/Cupcake_about.jpg' },
  { name: 'Bolo de Casamento', image: '/img/Cupcake_about.jpg' },
  { name: 'Doces Finos', image: '/img/Cupcake_about.jpg' },
]

export default function Products() {
  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const handleBudgetRequest = (productName: string) => {
    alert(`Solicitação de orçamento para ${productName}`)
  }

  return (
    <section id="Product" className="py-20 bg-pink-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-pink-600 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nossos Produtos
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Slider {...settings}>
            {products.map((product, index) => (
              <div key={index} className="px-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-pink-600">{product.name}</h3>
                    <button
                      onClick={() => handleBudgetRequest(product.name)}
                      className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors"
                    >
                      Solicitar Orçamento
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  )
}