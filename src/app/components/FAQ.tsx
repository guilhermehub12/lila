'use client'

import { useState } from 'react'

const faqs = [
  {
    question: "Onde posso encontrar as lojas da Lila Baking Studio?",
    answer: "Temos lojas em várias cidades do Brasil. Visite nosso Localizador de Lojas para encontrar a mais próxima de você."
  },
  {
    question: "Posso fazer pedidos online para entrega?",
    answer: "Absolutamente! Nosso sistema de pedidos online permite que você escolha todo o nosso menu, e oferecemos entrega conveniente até sua porta."
  },
  {
    question: "Vocês têm um programa de fidelidade para clientes regulares?",
    answer: "Sim, temos um programa de fidelidade que recompensa você com descontos exclusivos, bolos grátis e ofertas especiais por ser um cliente valioso."
  },
  {
    question: "O que diferencia a Lila Baking Studio de outras confeitarias?",
    answer: "Nos orgulhamos de usar os melhores ingredientes, combinações de sabores únicas e um compromisso com a apresentação artística que faz de cada bolo e doce uma obra de arte."
  }
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="FAQs" className="py-20 px-4">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Perguntas Frequentes</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="flex justify-between items-center w-full p-5 font-medium text-left text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-pink-500 focus-visible:ring-opacity-75"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="flex-1 pr-4">{faq.question}</span>
                <svg
                  className={`w-6 h-6 ${activeIndex === index ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="px-5 py-3 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

