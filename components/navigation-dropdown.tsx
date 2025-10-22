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
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setIsNestedOpen(true)
  }

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsNestedOpen(false)
    }, 200)
    setTimeoutId(id)
  }

  if (!subcategory.nested) {
    return (
      <Link
        href={subcategory.href}
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
      >
        {subcategory.name}
      </Link>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer border-b border-gray-100 transition-colors duration-150">
        <span className="font-medium">{subcategory.name}</span>
        <ChevronRight className="h-4 w-4 text-gray-500" />
      </div>

      {isNestedOpen && (
        <div 
          className="absolute left-full top-0 w-72 bg-white border border-gray-200 shadow-xl z-[9999] rounded-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            display: 'block',
            visibility: 'visible',
            opacity: '1',
            position: 'absolute',
            top: '0',
            left: '100%',
            marginLeft: '4px',
            width: '288px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            zIndex: 9999,
            borderRadius: '8px'
          }}
        >
          <div className="py-3 px-2">
            <div className="text-sm text-gray-700 font-medium mb-3 px-3 py-2 bg-gray-50 rounded-md mx-2">
              {subcategory.name}
            </div>
            {subcategory.nested.map((nestedItem, index) => (
              <Link
                key={index}
                href={nestedItem.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md mx-1 transition-colors duration-150"
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
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsOpen(false)
    }, 200)
    setTimeoutId(id)
  }

  return (
    <div 
      className="relative" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="flex items-center space-x-1 px-2 py-1 text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 w-80 bg-white border border-gray-200 shadow-xl z-[9999] rounded-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            display: 'block',
            visibility: 'visible',
            opacity: '1',
            position: 'absolute',
            top: '100%',
            left: '0',
            marginTop: '4px',
            width: '320px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            zIndex: 9999,
            borderRadius: '8px'
          }}
        >
          <div className="py-3 px-2">
            <div className="text-sm text-gray-700 font-medium mb-3 px-3 py-2 bg-gray-50 rounded-md mx-2">
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
