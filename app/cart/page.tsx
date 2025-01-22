"use client"

import { useCart } from "@/components/cart-context"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-light mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push('/products')} className="bg-[#2A254B]">Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-light mb-8">Your shopping cart</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex gap-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">PKR{item.price}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity || 1}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-20"
                />
                <Button variant="link" onClick={() => removeItem(item.id)} className="text-red-500">
                  Remove
                </Button>
              </TableCell>
              <TableCell className="text-right">PKR{item.price * item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-8 flex justify-end">
        <div className="w-full max-w-md">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>PKR{total}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>PKR20</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>PKR{total + 20}</span>
          </div>
          <Button 
            className="bg-[#2A254B] w-full mt-4"
            onClick={() => router.push('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

