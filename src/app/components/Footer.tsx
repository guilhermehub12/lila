import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer id="Contact" className="bg-gray-900 text-white py-12 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Lila Baking Studio</h3>
                        <p className="mb-4">Adoçando sua vida com bolos e doces artesanais desde 2018.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn /></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Links Rápidos</h4>
                        <ul className="space-y-2">
                            <li><Link href="#Home" className="hover:text-pink-500">Início</Link></li>
                            <li><Link href="#About" className="hover:text-pink-500">Sobre Nós</Link></li>
                            <li><Link href="#Services" className="hover:text-pink-500">Serviços</Link></li>
                            <li><Link href="#FAQs" className="hover:text-pink-500">FAQs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Nossos Serviços</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-pink-500">Bolos Personalizados</a></li>
                            <li><a href="#" className="hover:text-pink-500">Doces para Eventos</a></li>
                            <li><a href="#" className="hover:text-pink-500">Workshops de Confeitaria</a></li>
                            <li><a href="#" className="hover:text-pink-500">Entrega de Bolos</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Contato</h4>
                        <a href="https://maps.app.goo.gl/cC8WS2t1ibZzXXxu5">
                            <p>R. Pereira Valente, 601 - Loja 03 - Meireles, 60160-250</p>
                            <p>Fortaleza - CE</p>
                        </a>
                        <a href="https://wa.link/p4tqt0">
                            <p>Telefone: (85) 98796-5157</p>
                        </a>
                        <p>Email: <a href="mailto:contato@lilabakingstudio.com">contato@lilabakingstudio.com</a></p>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p>&copy; 2024 Lila Baking Studio. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

