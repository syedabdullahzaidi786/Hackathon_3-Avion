import Image from "next/image"
import { Button } from "@/components/ui/button"
import { client } from "@/lib/sanity"
import AddToCartButton from "@/components/add-to-cart-button"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface Product {
    _id: string
    name: string
    price: number
    image: string
    description: string
}

async function getProducts() {
    const start = Date.now()
    const products: Product[] = await client.fetch(`
    *[_type == "product"] {
      _id,
      name,
      price,
      "image": image.asset->url,
      description
    }
  `)
    const end = Date.now()
    console.log(`Fetched ${products.length} products from Sanity in ${end - start}ms`)
    return products
}

export default async function ProductsPage() {
    const products = await getProducts()

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-light mb-8">All products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product: Product) => (
                    <div key={product._id} className="group">
                        <div className="relative aspect-square mb-4">
                            <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-gray-600">PKR{product.price}</p>
                        <AddToCartButton product={product} />
                    </div>
                ))}
            </div>
        </div>
    )
}
