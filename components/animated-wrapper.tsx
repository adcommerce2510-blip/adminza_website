"use client"

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

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
  const { ref, isInView } = useScrollAnimation()

  // Reset animation classes when not in view
  const getAnimationClass = () => {
    if (!isInView) {
      switch (animation) {
        case 'fade-in-up':
          return 'opacity-0 translate-y-8'
        case 'fade-in-down':
          return 'opacity-0 -translate-y-8'
        case 'fade-in-left':
          return 'opacity-0 -translate-x-8'
        case 'fade-in-right':
          return 'opacity-0 translate-x-8'
        case 'scale-in':
          return 'opacity-0 scale-95'
        case 'slide-in-up':
          return 'opacity-0 translate-y-12'
        case 'slide-in-down':
          return 'opacity-0 -translate-y-12'
        case 'fade-in':
        default:
          return 'opacity-0'
      }
    }
    return animation
  }

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-800 ease-out ${getAnimationClass()} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

interface StaggeredContainerProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
}

export function StaggeredContainer({ 
  children, 
  className = '',
  staggerDelay = 100 
}: StaggeredContainerProps) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-800 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ animationDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
