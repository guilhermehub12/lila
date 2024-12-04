"use client"

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { data } from 'framer-motion/client'

// Tipos e constantes
const CAKE_SIZES = [
  { name: 'Mini', description: 'Aro 12cm, 1kg, 8 pessoas', price: 140 },
  { name: 'P', description: 'Aro 15cm, 1,8kg, 15 pessoas', price: 210 },
  { name: 'M', description: 'Aro 17cm, 2,5kg, 20 pessoas', price: 260 },
  { name: 'G', description: 'Aro 20cm, 3,2kg, 30 pessoas', price: 300 }
]

const CAKE_FLAVORS = [
  'Clássico',
  'Frutas Vermelhas',
  'Chocolatudo',
  'Croc',
  'Duo',
  'Snickers',
  'Toffee',
  'Clássico Preto'
]

const CAKE_MODELS = [
  'Felpudo',
  'Vintage',
  'Desenho',
  'Metálico',
  'Ganache',
  'Bicos',
  'Textura',
  'Camadas',
  'Floral'
]

const SWEET_TYPES = {
  Tradicionais: {
    flavors: ['Brigadeiro Croc', 'Ninho', 'Churros', 'Beijinho', 'Crocante', 'Casadinho'],
    prices: { 49: 85, 98: 140 }
  },
  Especiais: {
    flavors: ['Brigadeiro Belga', 'Brulée', 'Surpresa de Uva', 'Brigadeiro dark', 'Ninho & Nutella', 'Romeu & Julieta'],
    prices: { 49: 110, 98: 190 }
  },
  Premium: {
    flavors: ['Pistache', 'Crispy Caramelo Salgado', 'Ruby', 'Ao Leite', 'Branco'],
    prices: { 49: 135, 98: 250 }
  }
}

// Esquema de validação
const orderSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  cakeSize: z.string().min(1, 'Selecione o tamanho do bolo'),
  cakeFlavor: z.string().min(1, 'Selecione o sabor do bolo'),
  cakeModel: z.string().min(1, 'Selecione o modelo do bolo'),
  deliveryDate: z.string().min(1, 'Selecione a data de entrega'),
  deliveryTime: z.string().min(1, 'Selecione o horário de entrega'),
  wantSweets: z.boolean(),
  sweetType: z.string().optional(),
  sweetFlavors: z.array(z.string()).optional(),
  sweetQuantity: z.number().optional().refine(
    value => value === undefined || (value === 49 || value === 98),
    { message: 'Quantidade deve ser 49 ou 98' }
  )
}).refine(
  data => !data.wantSweets || (data.sweetType && data.sweetFlavors && data.sweetQuantity),
  { message: 'Por favor, preencha todos os campos de doces', path: ['wantSweets'] }
)

type OrderFormData = z.infer<typeof orderSchema>

export default function CakeOrderForm() {
  const [totalPrice, setTotalPrice] = useState(0)
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      wantSweets: false
    }
  })

  const wantSweets = watch('wantSweets')
  const sweetType = watch('sweetType')
  const cakeSize = watch('cakeSize')
  const sweetQuantity = watch('sweetQuantity')

  const calculatePrice = () => {
    let price = 0

    if (wantSweets && sweetType && sweetQuantity) {
      price += SWEET_TYPES[sweetType].prices[sweetQuantity]
    }

    setTotalPrice(price)
  }

  // Obter a data de amanhã para definir como mínimo
  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  //
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    calculatePrice()

    try {
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          totalPrice,
          sweetFlavors: data.sweetFlavors || []
        })
      })

      const responseData = await response.json()

      if (response.ok) {
        // Redirecionar para a página de confirmação
        window.location.href = '/confirmacao'
      } else {
        setSubmitError(responseData.message || 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.')
        // alert(submitError)
      }
    } catch (error) {
      console.error('Erro:', error)
      setSubmitError('Ocorreu um erro de conexão. Por favor, tente novamente mais tarde.')
      // alert('Erro ao enviar o pedido!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id='Contact' className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-pink-50 shadow-xl rounded-2xl my-8">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h4 className="text-4xl font-bold text-center mb-8 text-pink-600 tracking-tight">Faça seu pedido</h4>
        {/* Campos pessoais */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Nome Completo</label>
          <input
            {...register('name')}
            className="w-full p-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200"
            placeholder="Seu nome"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">E-mail</label>
          <input
            {...register('email')}
            type="email"
            className="w-full p-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200"
            placeholder="seu@email.com"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Telefone</label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full p-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200"
            placeholder="(XX) XXXXX-XXXX"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        {/* Detalhes do bolo */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Tamanho do Bolo</label>
          <Controller
            name="cakeSize"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 bg-white transition-all duration-200"
              >
                <option value="">Selecione o tamanho</option>
                {CAKE_SIZES.map(size => (
                  <option key={size.name} value={size.name}>
                    {size.name} - {size.description} - À partir de R$ {size.price}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.cakeSize && <p className="text-red-500">{errors.cakeSize.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Sabor do Bolo</label>
          <Controller
            name="cakeFlavor"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200"
              >
                <option value="">Selecione o sabor</option>
                {CAKE_FLAVORS.map(flavor => (
                  <option key={flavor} value={flavor}>
                    {flavor}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.cakeFlavor && <p className="text-red-500">{errors.cakeFlavor.message}</p>}
        </div>

        {/* Novo campo de Modelo do Bolo */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Modelo do Bolo</label>
          <Controller
            name="cakeModel"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200"
              >
                <option value="">Selecione o modelo</option>
                {CAKE_MODELS.map(model => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.cakeModel && <p className="text-red-500">{errors.cakeModel.message}</p>}
        </div>

        {/* Campo de Data de Entrega */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Data de Entrega</label>
          <input
            type="date"
            {...register('deliveryDate')}
            min={getTomorrowDate()}
            className="w-full p-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200"
          />
          {errors.deliveryDate && <p className="text-red-500">{errors.deliveryDate.message}</p>}
        </div>

        {/* Campo de Horário de Entrega */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Horário de Entrega</label>
          <input
            type="time"
            {...register('deliveryTime')}
            min="08:00"
            max="20:00"
            className="w-full p-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200"
          />
          {errors.deliveryTime && <p className="text-red-500">{errors.deliveryTime.message}</p>}
          <p className="text-sm text-gray-500 mt-1">
            Horário de entrega entre 8:00 e 20:00
          </p>
        </div>

        {/* Doces */}
        <div className="flex items-center space-x-2 bg-pink-50 p-4 rounded-lg">
          <input
            type="checkbox"
            {...register('wantSweets')}
            className="w-5 h-5 text-pink-500 border-pink-300 rounded focus:ring-pink-400"
          />
          <label className="font-medium text-gray-700">Deseja adicionar doces?</label>
        </div>

        {wantSweets && (
          <>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Tipo de Doces</label>
              <Controller
                name="sweetType"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full p-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200"
                  >
                    <option value="">Selecione o tipo</option>
                    {Object.keys(SWEET_TYPES).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                )}
              />
            </div>

            {sweetType && (
              <>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Sabores dos Doces</label>
                  <Controller
                    name="sweetFlavors"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-3 gap-2">
                        {SWEET_TYPES[sweetType].flavors.map(flavor => (
                          <label key={flavor} className="flex items-center">
                            <input
                              type="checkbox"
                              value={flavor}
                              checked={field.value?.includes(flavor)}
                              onChange={(e) => {
                                const newValue = e.target.checked
                                  ? [...(field.value || []), flavor]
                                  : field.value?.filter(f => f !== flavor)
                                field.onChange(newValue)
                              }}
                              className="mr-2"
                            />
                            {flavor}
                          </label>
                        ))}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Quantidade de Doces</label>
                  <Controller
                    name="sweetQuantity"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full p-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200"
                        onChange={(e) => {
                          field.onChange(Number(e.target.value))
                          calculatePrice()
                        }}
                      >
                        <option value="">Selecione a quantidade</option>
                        <option value={49}>49 unidades - R$ {SWEET_TYPES[sweetType].prices[49]}</option>
                        <option value={98}>98 unidades - R$ {SWEET_TYPES[sweetType].prices[98]}</option>
                      </select>
                    )}
                  />
                </div>
              </>
            )}
          </>
        )}

        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 rounded ${isSubmitting
            ? 'bg-pink-300 cursor-not-allowed'
            : 'bg-pink-500 hover:bg-pink-600 hover:shadow-lg transform hover:-translate-y-1'
            } text-white`}
        >
          {isSubmitting ? 'Enviando...' : 'Fazer Pedido'}
        </button>
      </form>
    </div>
  )
}