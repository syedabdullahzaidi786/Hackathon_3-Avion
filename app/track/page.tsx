"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PackageSearch } from "lucide-react"

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-50 p-3 rounded-md">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
)

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("")
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setOrderDetails(null)

    try {
      const response = await fetch(`/api/track-order?orderId=${orderId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch order details")
      }
      const data = await response.json()
      setOrderDetails(data)
    } catch (err) {
      setError("Failed to fetch order details. Please check your order ID and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-light flex items-center gap-2">
            <PackageSearch className="h-6 w-6" />
            Track Your Order
          </CardTitle>
          <CardDescription>Enter your order ID to track your package</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID</Label>
              <div className="flex space-x-2">
                <Input
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID"
                  required  
                  className="flex-grow"
                />
                <Button
  type="submit"
  disabled={isLoading}
  className={`bg-[#2e2852] text-white px-4 py-2 rounded-lg transition-all ${
    isLoading ? "bg-purple-400 cursor-not-allowed" : "hover:bg-purple-700"
  }`}
>
  {isLoading ? (
    <>
      <span className="loading loading-spinner loading-sm mr-2"></span>
      Tracking...
    </>
  ) : (
    "Track Order"
  )}
</Button>

              </div>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
              <p>{error}</p>
            </div>
          )}

          {orderDetails && (
            <div className="mt-8 space-y-6">
              <h3 className="text-xl font-semibold">Order Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="Order ID" value={orderDetails._id} />
                <InfoItem label="Status" value={orderDetails.status} />
                <InfoItem label="Total Amount" value={`PKR${orderDetails.totalAmount.toFixed(2)}`} />
                <InfoItem label="Order Date" value={new Date(orderDetails.createdAt).toLocaleDateString()} />
              </div>
              <div>
                <h4 className="font-medium mb-2">Items:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {orderDetails.items.map((item: any, index: number) => (
                    <li key={index}>
                      {item.name} - Qty: {item.quantity}, Price:PKR{item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Shipping Address:</h4>
                <p className="whitespace-pre-wrap">{orderDetails.customer.address}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

