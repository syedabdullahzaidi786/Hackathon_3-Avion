import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface CheckoutSuccessProps {
    orderId?: string
    paymentIntentId?: string
}

export function CheckoutSuccess({ orderId, paymentIntentId }: CheckoutSuccessProps) {
    return (
        <Card className="max-w-2xl mx-auto mt-8">
            <CardContent className="pt-6 text-center">
                <div className="mb-6">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                </div>

                <h2 className="text-3xl font-light mb-4">Thank You for Your Order!</h2>

                <div className="space-y-4 mb-8">
                    <p className="text-gray-600">We've received your order and will send you an email confirmation shortly.</p>
                    {orderId && <p className="text-sm text-muted-foreground">Order ID: {orderId}</p>}
                    {paymentIntentId && <p className="text-sm text-muted-foreground">Payment ID: {paymentIntentId}</p>}
                    <p className="text-sm text-muted-foreground">Your order will be processed and shipped within 24 hours.</p>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg mb-8">
                    <h3 className="font-medium mb-4">What happens next?</h3>
                    <ul className="text-sm text-left space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="font-medium">1.</span>
                            <span>You'll receive an order confirmation email with your order number</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-medium">2.</span>
                            <span>Once your order is shipped, we'll send you tracking information</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-medium">3.</span>
                            <span>Your items will be delivered to your specified address</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/products">
                        <Button className="bg-[#2A254B]" variant="default" size="lg">
                            Continue Shopping
                        </Button>
                    </Link>
                    <Link href="/track">
                        <Button className="bg-[#2A254B]" variant="default" size="lg">
                            View Order Status
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

