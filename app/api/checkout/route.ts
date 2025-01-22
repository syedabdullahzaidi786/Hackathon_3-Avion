import { client } from "@/lib/sanity"
import { NextResponse } from "next/server"
import { sendOrderConfirmationEmail } from "@/lib/send-email"

export async function POST(req: Request) {
    if (!process.env.SANITY_API_TOKEN) {
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    try {
        const start = Date.now()
        const body = await req.json()
        const { customerInfo, items, total, paymentIntentId } = body

        // Create customer first
        const customer = await client.create({
            _type: "customer",
            ...customerInfo,
        })

        // Then create order
        const order = await client.create({
            _type: "order",
            customer: {
                _type: "reference",
                _ref: customer._id,
            },
            items: items.map((item: any) => ({
                _key: crypto.randomUUID(),
                _type: "orderItem",
                productId: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount: total,
            status: "paid",
            paymentIntentId,
            createdAt: new Date().toISOString(),
        })

        // Send order confirmation email with paymentIntentId
        const emailResult = await sendOrderConfirmationEmail({
            orderId: order._id,
            fullName: customerInfo.name,
            email: customerInfo.email,
            contactNumber: customerInfo.contactNumber,
            deliveryAddress: customerInfo.address,
            subtotal: total - 20, // Assuming PKR20 is the shipping cost
            shippingCost: 20,
            totalCost: total,
            paymentIntentId: paymentIntentId, // Added this line to pass paymentIntentId
        })

        const end = Date.now()
        console.log(`Checkout completed for order ${order._id} in ${end - start}ms`)

        return NextResponse.json({
            success: true,
            orderId: order._id,
            emailSent: emailResult.success,
        })
    } catch (error: any) {
        console.error("Checkout error:", error)
        return NextResponse.json({ error: "Failed to process order" }, { status: 500 })
    }
}