export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  variants: ProductVariant[]
  category: string
  inStock: boolean
}

export interface ProductVariant {
  id: string
  name: string
  price: number
  options: {
    size?: string
    fabric?: string
    color?: string
  }
}

export interface CartItem {
  productId: string
  variantId: string
  quantity: number
  price: number
}

export interface Bundle {
  id: string
  name: string
  description: string
  items: string[]
  regularPrice: number
  bundlePrice: number
  savings: number
}
