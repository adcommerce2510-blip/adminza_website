"use client"

import { ReactNode } from 'react'

interface AnimatedWrapperProps {
  children: ReactNode
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'slide-in-up' | 'slide-in-down'
  delay?: number
  className?: string
}

export function AnimatedWrapper({ 
  children, 
  animation = 'fade-in-up', 
  delay = 0,
  className = '' 
}: AnimatedWrapperProps) {
  return (
    <div 
      className={`transition-all duration-800 ease-out ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

interface StaggeredContainerProps {
  children: ReactNode | ReactNode[]
  className?: string
  staggerDelay?: number
}

export function StaggeredContainer({ 
  children, 
  className = '',
  staggerDelay = 100 
}: StaggeredContainerProps) {
  // Ensure children is always an array
  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className="transition-all duration-800 ease-out"
          style={{ animationDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
