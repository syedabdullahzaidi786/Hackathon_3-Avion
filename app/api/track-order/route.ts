import { NextResponse } from "next/server"
import { client } from "@/lib/sanity"
import { headers } from "next/headers"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")

  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
  }

  try {
    console.log(`[${new Date().toISOString()}] Fetching order: ${orderId}`)
    const order = await client.fetch(
      `*[_type == "order" && _id == $orderId][0]{
        _id,
        totalAmount,
        status,
        createdAt,
        items[]{
          name,
          quantity,
          price
        },
        customer->{
          name,
          email,
          address
        }
      }`,
      { orderId },
    )

    if (!order) {
      console.log(`[${new Date().toISOString()}] Order not found: ${orderId}`)
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const userAgent = headers().get("user-agent") || "Unknown"
    console.log(`[${new Date().toISOString()}] Order ${orderId} fetched successfully. User-Agent: ${userAgent}`)
    return NextResponse.json(order)
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching order ${orderId}:`, error)
    return NextResponse.json({ error: "Failed to fetch order details" }, { status: 500 })
  }
}

