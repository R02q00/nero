'use client'
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/themeToggle'
import { useEffect, useState } from 'react';

export default function HomePage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/');
  };

  useEffect(() => {
    
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8 bg-white dark:bg-gray-900">
      <div className='flex justify-between'>
        <h1 className='text-black dark:text-white font-bold'>Nero</h1>
        <ThemeToggle />
      </div>
      <div className='flex items-center justify-center'>
        <h1 className="text-3xl font-bold">Welcome, to <span className='text-cyan-400'>Nero</span> {}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}