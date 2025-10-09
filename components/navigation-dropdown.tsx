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
        className="block px-4 py-3 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-700 border-b border-gray-100 last:border-b-0"
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
      <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-700 cursor-pointer border-b border-gray-100">
        <span className="font-medium">{subcategory.name}</span>
        <ChevronRight className="h-4 w-4 text-blue-600" />
      </div>

      {isNestedOpen && (
        <div 
          className="absolute left-full top-0 mt-0 ml-2 w-72 bg-white border-2 border-blue-500 shadow-2xl z-[9999] rounded-lg"
          onMouseEnter={() => setIsNestedOpen(true)}
          onMouseLeave={() => setIsNestedOpen(false)}
          style={{
            display: 'block',
            visibility: 'visible',
            opacity: '1',
            position: 'absolute',
            top: '0',
            left: '100%',
            marginLeft: '8px',
            width: '288px',
            backgroundColor: 'white',
            border: '2px solid #3b82f6',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            zIndex: 9999,
            borderRadius: '8px'
          }}
        >
          <div className="py-3 px-2">
            <div className="text-xs text-blue-600 font-semibold mb-2 px-3">
              {subcategory.name}
            </div>
            {subcategory.nested.map((nestedItem, index) => (
              <Link
                key={index}
                href={nestedItem.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md mx-1"
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
    <div 
      className="relative" 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-80 bg-white border-2 border-blue-500 shadow-2xl z-[9999] rounded-lg"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          style={{
            display: 'block',
            visibility: 'visible',
            opacity: '1',
            position: 'absolute',
            top: '100%',
            left: '0',
            marginTop: '8px',
            width: '320px',
            backgroundColor: 'white',
            border: '2px solid #3b82f6',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            zIndex: 9999,
            borderRadius: '8px'
          }}
        >
          <div className="py-3 px-2">
            <div className="text-xs text-blue-600 font-semibold mb-2 px-3">
              {title} Categories
            </div>
            {subcategories.map((subcategory, index) => (
              <NestedMenuItem key={index} subcategory={subcategory} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
