import { FaBirthdayCake } from 'react-icons/fa'

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-50">
      <div className="text-center">
        <FaBirthdayCake className="inline-block w-16 h-16 text-pink-500 animate-bounce" />
        <p className="mt-4 text-xl font-semibold text-pink-700">Carregando delícias...</p>
      </div>
    </div>
  )
}

