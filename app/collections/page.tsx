import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const collections = [
  { id: 1, name: "Sofas", image: "/sofa.svg" },
  { id: 2, name: "Tables", image: "/table.png" },
  { id: 3, name: "Chairs", image: "/chair.svg" },
  { id: 4, name: "Lamps", image: "/lamp.svg" },
  { id: 5, name: "Beds", image: "/bed.png" },
  { id: 6, name: "Vase", image: "/vase.svg" },
]

export default function CollectionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-light mb-8">Our Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <div key={collection.id} className="relative group">
            <Image
              src={collection.image || "/placeholder.svg"}
              alt={collection.name}
              width={400}
              height={300}
              className="w-full aspect-[4/3] object-cover mb-4"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Link href={`/collections/${collection.id}`}>
                <Button variant="secondary">{collection.name}</Button>
              </Link>
            </div>
            <h3 className="font-medium text-center">{collection.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

