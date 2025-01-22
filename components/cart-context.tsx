"use client"

import { createContext, useContext, useState, useCallback } from 'react'
import { toast } from 'sonner'

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id)
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentItems, { ...newItem, quantity: 1 }]
    })

    toast.success('Added to cart', {
      position: 'top-left',
      description: `${newItem.name} has been added to your cart`
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(items => items.filter(item => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

