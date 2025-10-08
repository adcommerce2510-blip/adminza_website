"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SubCategory {
  name: string
  href: string
  nested?: SubCategory[]
}

interface NavigationDropdownProps {
  title: string
  subcategories: SubCategory[]
}

function NestedMenuItem({ subcategory }: { subcategory: SubCategory }) {
  const [isNestedOpen, setIsNestedOpen] = useState(false)

  if (!subcategory.nested) {
    return (
      <Link
        href={subcategory.href}
        className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors duration-150"
      >
        {subcategory.name}
      </Link>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsNestedOpen(true)}
      onMouseLeave={() => setIsNestedOpen(false)}
    >
      <div className="flex items-center justify-between px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors duration-150 cursor-pointer">
        <span>{subcategory.name}</span>
        <ChevronRight className="h-4 w-4" />
      </div>

      {isNestedOpen && (
        <div className="absolute left-full top-0 mt-2 ml-1 w-64 glass-effect rounded-lg shadow-xl border z-50 fade-in">
          <div className="py-2">
            {subcategory.nested.map((nestedItem, index) => (
              <Link
                key={index}
                href={nestedItem.href}
                className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors duration-150"
              >
                {nestedItem.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function NavigationDropdown({ title, subcategories }: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center space-x-1 px-2.5 py-2 text-[0.9rem] font-medium text-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap">
        <span>{title}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 glass-effect rounded-lg shadow-xl border z-50 fade-in">
          <div className="py-2">
            {subcategories.map((subcategory, index) => (
              <NestedMenuItem key={index} subcategory={subcategory} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
