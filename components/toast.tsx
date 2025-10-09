"use client"

import { useState, useEffect } from "react"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose, duration])

  if (!isVisible) return null

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center animate-in fade-in-0 duration-300"
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: 99999,
        pointerEvents: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-white border-2 border-green-500 rounded-xl shadow-2xl p-6 max-w-md mx-4 flex items-center space-x-4 animate-in zoom-in-95 duration-300"
        style={{
          backgroundColor: 'white',
          border: '2px solid #10b981',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          padding: '24px',
          maxWidth: '448px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          transform: 'scale(1)',
          pointerEvents: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-base font-semibold text-gray-900">{message}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

// Hook for managing toast state
export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; isVisible: boolean }>>([])

  const showToast = (message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, message, isVisible: true }])
  }

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return { toasts, showToast, hideToast }
}
