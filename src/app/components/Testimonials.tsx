'use client'

import { useState } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    name: "Mariana Costa",
    role: "Cliente",
    image: "/img/female.png",
    quote: "Os bolos da Lila Baking Studio são pura magia! Nunca provei nada parecido. Cada mordida é uma surpresa deliciosa."
  },
  {
    name: "Pedro Alves",
    role: "Cliente",
    image: "/img/male.png",
    quote: "A atenção aos detalhes na apresentação dos bolos é incrível. Dá para perceber que eles colocam o coração em cada criação."
  },
  {
    name: "Camila Rodrigues",
    role: "Cliente",
    image: "/img/female.png",
    quote: "A Lila Baking Studio se tornou nossa escolha para todas as celebrações do escritório. A entrega é sempre pontual e os doces são um sucesso com todos."
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="Testimonial" className="py-20 bg-pink-500 text-white px-4">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="text-center">
              <Image 
                src={testimonials[currentIndex].image} 
                alt={testimonials[currentIndex].name} 
                width={100} 
                height={100} 
                className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
              />
              <p className="text-xl italic px-8 mb-4">"{testimonials[currentIndex].quote}"</p>
              <h3 className="text-lg font-semibold">{testimonials[currentIndex].name}</h3>
              <p className="text-pink-200">{testimonials[currentIndex].role}</p>
            </div>
            <button 
              onClick={prevTestimonial} 
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-pink-600 p-2 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextTestimonial} 
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-pink-600 p-2 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

