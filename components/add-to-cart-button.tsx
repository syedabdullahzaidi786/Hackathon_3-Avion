"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"

interface Product {
    _id: string
    name: string
    price: number
    image: string
}

export default function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCart()

    return (
        <Button
            onClick={() =>
            addItem({
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
        })
    }
    className="w-full mt-2 bg-[#2A254B] text-white px-4 py-2 rounded-lg transition-all hover:bg-purple-700"
>
    Add to Cart
</Button>
    )
}
