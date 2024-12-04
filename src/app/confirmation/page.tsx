import Link from "next/link";

export default function Confirmation() {
  return(
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Pedido realizado com sucesso!</h1>
      <p className="text-lg mb-2">Obrigado por fazer o seu pedido conosco.</p>
      <span className="text-lg mb-8">Em breve entraremos em contato pelo <b>WhatsApp</b> para confirmar o seu pedido.</span>
      <Link href="/" className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
        Voltar para a página inicial
      </Link>
    </div>
  )
}