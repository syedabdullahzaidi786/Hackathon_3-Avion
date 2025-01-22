import { createClient } from "next-sanity"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-18",
  useCdn: false, // Disable CDN to always fetch fresh data
  token: process.env.SANITY_API_TOKEN,
})

