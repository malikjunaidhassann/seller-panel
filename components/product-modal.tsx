"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronsUpDown, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

// Common e-commerce categories
const categories = [
  { label: "Electronics", value: "electronics" },
  { label: "Clothing", value: "clothing" },
  { label: "Home & Kitchen", value: "home-kitchen" },
  { label: "Beauty & Personal Care", value: "beauty" },
  { label: "Sports & Outdoors", value: "sports" },
  { label: "Toys & Games", value: "toys" },
  { label: "Books", value: "books" },
  { label: "Automotive", value: "automotive" },
  { label: "Health & Household", value: "health" },
  { label: "Office Products", value: "office" },
]

interface ProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductModal({ open, onOpenChange }: ProductModalProps) {
  const [category, setCategory] = useState("")
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [featured, setFeatured] = useState(false)
  const [inStock, setInStock] = useState(true)

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission
    // For now, we'll just close the modal
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Fill in the details to add a new product to your inventory.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="product-image" className="block mb-2">
                  Product Image
                </Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Drag and drop an image or click to browse</p>
                  <Input id="product-image" type="file" accept="image/*" className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("product-image")?.click()}
                  >
                    Upload Image
                  </Button>
                </div>
              </div>

              <div className="col-span-2">
                <Label htmlFor="name" className="block mb-2">
                  Product Name
                </Label>
                <Input id="name" placeholder="Enter product name" />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description" className="block mb-2">
                  Description
                </Label>
                <Textarea id="description" placeholder="Enter product description" rows={3} />
              </div>

              <div className="col-span-1">
                <Label htmlFor="price" className="block mb-2">
                  Price ($)
                </Label>
                <Input id="price" type="number" min="0" step="0.01" placeholder="0.00" />
              </div>

              <div className="col-span-1">
                <Label htmlFor="cost" className="block mb-2">
                  Cost Price ($)
                </Label>
                <Input id="cost" type="number" min="0" step="0.01" placeholder="0.00" />
              </div>

              <div className="col-span-1">
                <Label htmlFor="sku" className="block mb-2">
                  SKU
                </Label>
                <Input id="sku" placeholder="Enter SKU" />
              </div>

              <div className="col-span-1">
                <Label htmlFor="stock" className="block mb-2">
                  Stock Quantity
                </Label>
                <Input id="stock" type="number" min="0" step="1" placeholder="0" />
              </div>

              <div className="col-span-2">
                <Label htmlFor="category" className="block mb-2">
                  Category
                </Label>
                <Popover open={openCategoryDropdown} onOpenChange={setOpenCategoryDropdown}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCategoryDropdown}
                      className="w-full justify-between"
                    >
                      {category ? categories.find((cat) => cat.value === category)?.label : "Select category..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((cat) => (
                            <CommandItem
                              key={cat.value}
                              value={cat.value}
                              onSelect={(currentValue) => {
                                setCategory(currentValue === category ? "" : currentValue)
                                setOpenCategoryDropdown(false)
                              }}
                            >
                              <Check
                                className={cn("mr-2 h-4 w-4", category === cat.value ? "opacity-100" : "opacity-0")}
                              />
                              {cat.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="col-span-2">
                <Label htmlFor="tags" className="block mb-2">
                  Tags
                </Label>
                <div className="flex">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tags..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} className="ml-2">
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-secondary-foreground/70 hover:text-secondary-foreground"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="col-span-1 flex items-center space-x-2">
                <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
                <Label htmlFor="featured">Featured Product</Label>
              </div>

              <div className="col-span-1 flex items-center space-x-2">
                <Switch id="in-stock" checked={inStock} onCheckedChange={setInStock} />
                <Label htmlFor="in-stock">In Stock</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
