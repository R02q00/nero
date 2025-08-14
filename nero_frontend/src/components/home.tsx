'use client'
import useUser from '@/hook/useUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();
    const { user, loading, error } = useUser();
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.push('/');
    };

    useEffect(() => {
        if (!user && !loading) {
            router.push('/');
        }
    }, [user])

    return (
        <div className='h-[90%] flex items-center justify-center'>
            <div className=''>
                <p className='text-center text-xl'>
                    Welcome to <span className='text-cyan-500 font-bold'>Nero</span><br />
                    I'am a simple AI assistant, you can ask me anything.
                </p>
                <div className='flex justify-center mt-5'>
                    <button onClick={() => router.push('/prompt') } className='px-4 py-1 border rounded-lg'>Let's start</button>
                </div>
            </div>
        </div>
    )
}