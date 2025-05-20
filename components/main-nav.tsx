import type React from "react"
import Link from "next/link"
import { BarChart, Home, Package, ShoppingCart, Users } from "lucide-react"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center text-sm font-medium transition-colors hover:text-primary">
        <Home className="mr-2 h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="#"
        className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Package className="mr-2 h-4 w-4" />
        Products
      </Link>
      <Link
        href="#"
        className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Orders
      </Link>
      <Link
        href="#"
        className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Users className="mr-2 h-4 w-4" />
        Customers
      </Link>
      <Link
        href="#"
        className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <BarChart className="mr-2 h-4 w-4" />
        Analytics
      </Link>
    </nav>
  )
}
