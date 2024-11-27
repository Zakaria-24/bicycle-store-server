export interface IProduct {
  name: string
  brand: string
  price: number
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric'
  description?: string | null
  quantity: number
  inStock: boolean
}
