"use client"

import { useState } from "react"
import Image from "next/image"
import { MoreHorizontal, TrendingUp, TrendingDown, Package } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductModal } from "@/components/product-modal"
import { Input } from "@/components/ui/input"

// Mock product data
const products = [
  {
    id: 1,
    name: "Premium Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    sales: 120,
    trend: "up",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Ergonomic Chair",
    category: "Furniture",
    price: 249.99,
    stock: 32,
    sales: 98,
    trend: "up",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 179.99,
    stock: 18,
    sales: 87,
    trend: "down",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 89.99,
    stock: 56,
    sales: 76,
    trend: "up",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Coffee Maker",
    category: "Kitchen",
    price: 129.99,
    stock: 23,
    sales: 65,
    trend: "down",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Laptop Stand",
    category: "Office",
    price: 49.99,
    stock: 78,
    sales: 54,
    trend: "up",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Desk Lamp",
    category: "Office",
    price: 39.99,
    stock: 42,
    sales: 43,
    trend: "down",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 79.99,
    stock: 31,
    sales: 38,
    trend: "up",
    image: "/placeholder.svg?height=40&width=40",
  },
]

interface TopProductsProps {
  searchQuery?: string
}

export function TopProducts({ searchQuery = "" }: TopProductsProps) {
  const [sortBy, setSortBy] = useState<string>("sales")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [searchQueryLocal, setSearchQuery] = useState(searchQuery)

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQueryLocal.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQueryLocal.toLowerCase()),
  )

  // Sort products based on current sort settings
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortBy === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price
    } else if (sortBy === "stock") {
      return sortOrder === "asc" ? a.stock - b.stock : b.stock - a.stock
    } else {
      // Default sort by sales
      return sortOrder === "asc" ? a.sales - b.sales : b.sales - a.sales
    }
  })

  const handleSort = (column: string) => {
    if (sortBy === column) {
      // Toggle sort order if clicking the same column
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      // Set new sort column and default to descending
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  return (
    <>
      <ProductModal open={isProductModalOpen} onOpenChange={setIsProductModalOpen} />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search products..."
            className="w-[300px]"
            value={searchQueryLocal}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline">Filter</Button>
        </div>
        <Button onClick={() => setIsProductModalOpen(true)}>
          <Package className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                Product Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("stock")}>
                Stock {sortBy === "stock" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("sales")}>
                Sales {sortBy === "sales" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Trend</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>
                    {product.trend === "up" ? (
                      <div className="flex items-center text-green-500">
                        <TrendingUp className="mr-1 h-4 w-4" />
                        <span>Up</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <TrendingDown className="mr-1 h-4 w-4" />
                        <span>Down</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit product</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View sales history</DropdownMenuItem>
                        <DropdownMenuItem>Update inventory</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
