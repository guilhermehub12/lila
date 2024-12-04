"use client"

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Tipos e constantes
const CAKE_SIZES = [
  { name: 'Mini', description: 'Aro 12cm, 1kg, 8 pessoas', price: 140 },
  { name: 'P', description: 'Aro 15cm, 1,8kg, 15 pessoas', price: 210 },
  { name: 'M', description: 'Aro 17cm, 2,5kg, 20 pessoas', price: 260 },
  { name: 'G', description: 'Aro 20cm, 3,2kg, 30 pessoas', price: 300 }
] as const

const CAKE_FLAVORS = [
  'Clássico',
  'Frutas Vermelhas',
  'Chocolatudo',
  'Croc',
  'Duo',
  'Snickers',
  'Toffee',
  'Clássico Preto'
] as const

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
] as const

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
} as const

type SweetType = keyof typeof SWEET_TYPES
type SweetQuantity = 49 | 98

// Esquema de validação
const orderSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  cakeSize: z.enum(['Mini', 'P', 'M', 'G'] as const),
  cakeFlavor: z.enum(CAKE_FLAVORS),
  cakeModel: z.enum(CAKE_MODELS),
  deliveryDate: z.string().min(1, 'Selecione a data de entrega'),
  deliveryTime: z.string().min(1, 'Selecione o horário de entrega'),
  wantSweets: z.boolean(),
  sweetType: z.enum(['Tradicionais', 'Especiais', 'Premium'] as const).optional(),
  sweetFlavors: z.array(z.string()).optional(),
  sweetQuantity: z.enum(['49', '98'] as const).optional()
}).refine(
  data => !data.wantSweets || (data.sweetType && data.sweetFlavors && data.sweetFlavors.length > 0 && data.sweetQuantity),
  { message: 'Por favor, preencha todos os campos de doces', path: ['wantSweets'] }
)

type OrderFormData = z.infer<typeof orderSchema>

export default function CakeOrder() {
  const [totalPrice, setTotalPrice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    control,
    handleSubmit,
    watch,
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

  useEffect(() => {
    calculatePrice()
  }, [cakeSize, wantSweets, sweetType, sweetQuantity])

  const calculatePrice = () => {
    let price = 0

    // if (cakeSize) {
    //   const selectedSize = CAKE_SIZES.find(size => size.name === cakeSize)
    //   if (selectedSize) {
    //     price += selectedSize.price
    //   }
    // }

    if (wantSweets && sweetType && sweetQuantity) {
      price += SWEET_TYPES[sweetType].prices[Number(sweetQuantity) as SweetQuantity]
    }

    setTotalPrice(price)
  }

  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

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
        window.location.href = '/confirmation'
      } else {
        setSubmitError(responseData.message || 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.')
      }
    } catch (error) {
      console.error('Erro:', error)
      setSubmitError('Ocorreu um erro de conexão. Por favor, tente novamente mais tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id='CakeOrder' className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-pink-50 shadow-xl rounded-2xl my-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h4 className="text-4xl font-bold text-center mb-8 text-pink-600 tracking-tight">Faça seu pedido</h4>

        {/* Campos pessoais */}
        <FormField
          label="Nome Completo"
          name="name"
          register={register}
          errors={errors}
          placeholder="Seu nome"
        />
        <FormField
          label="E-mail"
          name="email"
          register={register}
          errors={errors}
          type="email"
          placeholder="seu@email.com"
        />
        <FormField
          label="Telefone"
          name="phone"
          register={register}
          errors={errors}
          type="tel"
          placeholder="(XX) XXXXX-XXXX"
        />

        {/* Detalhes do bolo */}
        <FormSelect
          label="Tamanho do Bolo"
          name="cakeSize"
          control={control}
          errors={errors}
          options={CAKE_SIZES.map(size => ({
            value: size.name,
            label: `${size.name} - ${size.description} - À partir de R$ ${size.price}`
          }))}
        />
        <FormSelect
          label="Sabor do Bolo"
          name="cakeFlavor"
          control={control}
          errors={errors}
          options={CAKE_FLAVORS.map(flavor => ({ value: flavor, label: flavor }))}
        />
        <FormSelect
          label="Modelo do Bolo"
          name="cakeModel"
          control={control}
          errors={errors}
          options={CAKE_MODELS.map(model => ({ value: model, label: model }))}
        />

        {/* Campos de entrega */}
        <FormField
          label="Data de Entrega"
          name="deliveryDate"
          register={register}
          errors={errors}
          type="date"
          min={getTomorrowDate()}
        />
        <FormField
          label="Horário de Entrega"
          name="deliveryTime"
          register={register}
          errors={errors}
          type="time"
          min="08:00"
          max="20:00"
        />
        <p className="text-sm text-gray-500 mt-1">
          Horário de entrega entre 8:00 e 20:00
        </p>

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
            <FormSelect
              label="Tipo de Doces"
              name="sweetType"
              control={control}
              errors={errors}
              options={Object.keys(SWEET_TYPES).map(type => ({ value: type, label: type }))}
            />

            {sweetType && (
              <>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Sabores dos Doces</label>
                  <Controller
                    name="sweetFlavors"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-3 gap-2">
                        {SWEET_TYPES[sweetType as SweetType].flavors.map(flavor => (
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

                <FormSelect
                  label="Quantidade de Doces"
                  name="sweetQuantity"
                  control={control}
                  errors={errors}
                  options={[
                    { value: '49', label: `49 unidades - R$ ${SWEET_TYPES[sweetType as SweetType].prices[49]}` },
                    { value: '98', label: `98 unidades - R$ ${SWEET_TYPES[sweetType as SweetType].prices[98]}` }
                  ]}
                />
                <div className="text-2xl font-bold text-center mb-4">
                  Total Doces: R$ {totalPrice.toFixed(2)}
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
            } text-white transition duration-300`}
        >
          {isSubmitting ? 'Enviando...' : 'Fazer Pedido'}
        </button>
      </form>
    </div>
  )
}

interface FormFieldProps {
  label: string
  name: keyof OrderFormData
  register: any
  errors: any
  type?: string
  placeholder?: string
  min?: string
  max?: string
}

function FormField({ label, name, register, errors, type = 'text', placeholder, min, max }: FormFieldProps) {
  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">{label}</label>
      <input
        {...register(name)}
        type={type}
        min={min}
        max={max}
        className="w-full p-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200"
        placeholder={placeholder}
      />
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  )
}

interface FormSelectProps {
  label: string
  name: keyof OrderFormData
  control: any
  errors: any
  options: { value: string, label: string }[]
}

function FormSelect({ label, name, control, errors, options }: FormSelectProps) {
  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className="w-full p-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 bg-white transition-all duration-200"
          >
            <option value="">Selecione uma opção</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  )
}

