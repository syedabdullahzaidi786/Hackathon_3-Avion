import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-context"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: {
        default: "Avion - Furniture for the Future",
        template: "%s | Avion",
    },
    description: "The furniture brand for the future, with timeless designs",
    keywords: ["furniture", "design", "home decor", "modern", "timeless"],
    authors: [{ name: "Avion" }],
    creator: "Avion",
    publisher: "Avion",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://ecommerce-avion.vercel.app"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Avion - Furniture for the Future",
        description: "The furniture brand for the future, with timeless designs",
        url: "https://ecommerce-avion.vercel.app",
        siteName: "Avion",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Avion - Furniture for the Future",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Avion - Furniture for the Future",
        description: "The furniture brand for the future, with timeless designs",
        images: ["/og-image.jpg"],
        creator: "@avion",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
        </CartProvider>
        </body>
        </html>
    )
}
