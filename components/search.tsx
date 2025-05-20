import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div className="relative w-full md:w-auto">
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search products..." className="pl-8 w-full md:w-[300px]" />
    </div>
  )
}
