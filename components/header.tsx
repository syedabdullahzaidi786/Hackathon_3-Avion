"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, Mountain, Search, ShoppingCart, User, PackageSearch } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useCart } from "@/components/cart-context"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const { items } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between max-w-screen-xl mx-auto px-4">
        <div className="flex items-center md:w-1/3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="h-6 w-6" />
            <span className="font-bold">Avion</span>
          </Link>
        </div>
        <nav
          className={`${isMobileMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row fixed md:static top-14 md:top-0 left-0 w-full md:w-auto bg-background md:bg-transparent p-4 md:p-0 border-b md:border-b-0 shadow-md md:shadow-none z-50 md:mx-auto md:w-1/3 justify-center`}
        >
          <NavigationMenu aria-label="Main navigation">
            <NavigationMenuList className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <NavigationMenuItem>
                {typeof window !== "undefined" && window.innerWidth < 768 ? (
                  <Link href="/collections" passHref legacyBehavior>
                    <NavigationMenuLink className="block py-2 px-4 text-lg md:text-base hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                      Collections
                    </NavigationMenuLink>
                  </Link>
                ) : (
                  <>
                    <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/collections"
                            >
                              <Mountain className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">Avion Collections</div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Explore our curated collections of beautiful furniture and home decor.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <ListItem href="/collections/plant-pots" title="Plant Pots">
                          Stylish containers for your green friends.
                        </ListItem>
                        <ListItem href="/collections/ceramics" title="Ceramics">
                          Handcrafted pottery and decorative items.
                        </ListItem>
                        <ListItem href="/collections/tables" title="Tables">
                          Functional and aesthetic centerpieces for your home.
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </>
                )}
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/products" passHref legacyBehavior>
                  <NavigationMenuLink className="block py-2 px-3 text-sm md:text-base hover:bg-accent hover:text-accent-foreground rounded-md transition-colors whitespace-nowrap">
                    All Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" passHref legacyBehavior>
                  <NavigationMenuLink className="block py-2 px-4 text-lg md:text-base hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="flex items-center space-x-2 md:w-1/3 justify-end">
          <Input placeholder="Search products..." className="hidden md:block w-[200px] lg:w-[300px]" />
          <Link href="/track">
            <Button variant="ghost" size="icon">
              <PackageSearch className="h-5 w-5" />
              <span className="sr-only">Track Order</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

function ListItem({
  className = "",
  title,
  children,
  ...props
}: {
  className?: string
  title: string
  children: React.ReactNode
  [key: string]: any
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}

