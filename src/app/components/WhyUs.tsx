import { FaCheck, FaUsers, FaStore } from 'react-icons/fa'

const reasons = [
  "Abordagem centrada no cliente: Sua satisfação é nossa prioridade.",
  "Variedade de sabores: Explore uma ampla gama de deliciosos sabores de bolos e doces.",
  "Práticas sustentáveis: Nos preocupamos com você e com o meio ambiente."
]

export default function WhyUs() {
  return (
    <section id="Why-us" className="py-20 bg-pink-500 text-white px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Por que escolher a Lila Baking Studio?</h2>
            <p className="text-lg md:text-xl mb-8">Aqui está o motivo pelo qual você deve nos escolher para suas necessidades de bolos e doces personalizados:</p>
            <ul className="mb-8 space-y-4">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-center">
                  <FaCheck className="mr-3 text-pink-200 flex-shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-pink-600 rounded-lg p-6 flex items-center">
                <FaUsers className="text-4xl mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-3xl font-bold">245</h3>
                  <p>Clientes Felizes</p>
                </div>
              </div>
              <div className="bg-pink-600 rounded-lg p-6 flex items-center">
                <FaStore className="text-4xl mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-3xl font-bold">27</h3>
                  <p>Filiais</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <img src="/img/cupcake_kid.png" alt="Criança feliz com cupcake" className="rounded-lg shadow-xl w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

