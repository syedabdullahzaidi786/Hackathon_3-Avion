import { client } from '@/lib/sanity'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const products = await client.fetch(`
      *[_type == "product"] {
        _id,
        name,
        price,
        "image": image.asset->url,
        description
      }
    `)
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

