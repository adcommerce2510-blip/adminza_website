"use client"

import { DynamicNavbar } from "./dynamic-navbar"

export function SecondaryNavbar() {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm relative">
      <div className="w-full px-1 py-3">
        <DynamicNavbar />
      </div>
      {/* Fade effect on the right to indicate scrollable content */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
    </div>
  )
}
