'use client'
import { Header } from '@/components/header';
import Home from '@/components/home'

export default function HomePage() {
  return (
    <div className='h-[100vh] dark:bg-gray-900'>
      <Header />
      <Home />
    </div>
  );
}