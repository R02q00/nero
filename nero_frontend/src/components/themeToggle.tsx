'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

export default function Theme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true);
    
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (<SunIcon className="h-5 w-5 dark:text-white" />) : (<MoonIcon className="h-5 w-5 dark:text-white" />)}
    </button>
  )
}