import { FaTruck, FaUsers, FaShoppingCart, FaBirthdayCake } from 'react-icons/fa'

const services = [
  {
    icon: <FaTruck className="w-12 h-12 text-pink-500" />,
    title: "Entrega",
    description: "Oferecemos opções de entrega convenientes para levar nossos deliciosos bolos e doces diretamente à sua porta."
  },
  {
    icon: <FaUsers className="w-12 h-12 text-pink-500" />,
    title: "Workshops de Confeitaria",
    description: "Participe de nossos workshops divertidos e educativos para aprender os segredos da decoração de bolos e doces com nossos confeiteiros experientes."
  },
  {
    icon: <FaShoppingCart className="w-12 h-12 text-pink-500" />,
    title: "Pedidos Personalizados",
    description: "Tem uma visão específica para seu bolo ou doce? Trabalharemos em estreita colaboração com você para dar vida às suas ideias."
  },
  {
    icon: <FaBirthdayCake className="w-12 h-12 text-pink-500" />,
    title: "Criações de Bolos e Doces",
    description: "Explore nossa ampla gama de sabores e designs de bolos e doces, perfeitos para aniversários, casamentos, chás de bebê e muito mais."
  }
]

export default function Services() {
  return (
    <section id="Services" className="py-20 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pink-600 mb-4">Nossos Serviços</h2>
          <p className="text-xl text-pink-500">Nossos serviços de bolos e doces são projetados para adoçar sua vida, um doce de cada vez.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 h-full">
              <div className="text-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

