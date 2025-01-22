import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia",
})

export async function POST(req: Request) {
    if (req.method === "POST") {
        try {
            const { amount } = await req.json()

            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100, // Stripe expects the amount in cents
                currency: "pkr",
            })

            return NextResponse.json({ clientSecret: paymentIntent.client_secret })
        } catch (err: any) {
            return NextResponse.json({ error: err.message }, { status: 500 })
        }
    } else {
        return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
    }
}

