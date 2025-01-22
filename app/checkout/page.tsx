"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { CheckoutSuccess } from "@/components/checkout-success"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface FormData {
  name: string
  email: string
  contactNumber: string
  address: string
}

const initialFormData: FormData = {
  name: "",
  email: "",
  contactNumber: "",
  address: "",
}

function CheckoutForm({
                        clientSecret,
                        formData,
                        total,
                        onSuccess,
                      }: {
  clientSecret: string
  formData: FormData
  total: number
  onSuccess: (orderId: string, paymentIntentId: string) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const { clearCart, items } = useCart()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: "if_required",
    })

    if (error) {
      toast.error("Payment failed", {
        description: error.message,
      })
      setIsProcessing(false)
    } else if (paymentIntent.status === "succeeded") {
      // Payment successful, create order
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerInfo: formData,
            items,
            total: total + 20, // Including shipping
            paymentIntentId: paymentIntent.id,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to process order")
        }

        toast.success("Order placed successfully!")
        clearCart()
        onSuccess(data.orderId, paymentIntent.id)
      } catch (error: any) {
        console.error("Checkout error:", error)
        toast.error("Error processing order", {
          description: error.message,
        })
      }
    }

    setIsProcessing(false)
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentElement />
        <Button type="submit" className="bg-[#2A254B] w-full" disabled={isProcessing || !stripe || !elements}>
          {isProcessing ? "Processing..." : `Pay PKR${total + 20}`}
        </Button>
      </form>
  )
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [clientSecret, setClientSecret] = useState("")
  const { total, items } = useCart()
  const router = useRouter()
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  const [orderId, setOrderId] = useState<string>()
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && items.length === 0 && !checkoutComplete) {
      router.push("/cart")
    } else if (items.length > 0) {
      // Create PaymentIntent as soon as the page loads
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total + 20 }), // total + shipping
      })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret))
    }
  }, [items, router, total, checkoutComplete])

  const handleCheckoutSuccess = (newOrderId: string, paymentIntentId: string) => {
    setOrderId(newOrderId)
    setPaymentIntentId(paymentIntentId)
    setCheckoutComplete(true)
  }

  if (checkoutComplete) {
    return <CheckoutSuccess orderId={orderId} paymentIntentId={paymentIntentId ?? undefined} />
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-light mb-8">Checkout</h1>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  minLength={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                  id="contactNumber"
                  type="tel"
                  required
                  value={formData.contactNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contactNumber: e.target.value }))}
                  placeholder="Enter your contact number"
                  pattern="\d{10,15}"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter your full address"
                  minLength={10}
                  className="min-h-[100px]"
              />
            </div>

            <div className="border-t pt-4">
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
            </div>

            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm
                      clientSecret={clientSecret}
                      formData={formData}
                      total={total}
                      onSuccess={handleCheckoutSuccess}
                  />
                </Elements>
            )}
          </div>
        </div>
      </div>
  )
}