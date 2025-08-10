import ThemeToggle from '@/components/themeToggle';
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
        if (!loading && !error) {
            /*router.push('/');*/
        }
    }, [loading, user, router])

    return (
        <div className="min-h-screen bg-gray-100 p-4 bg-white dark:bg-gray-900">
            <div className='flex justify-between'>
                <h1 className='text-xl text-black dark:text-white'>AV</h1>
                <ThemeToggle />
            </div>
            <div className='flex justify-center items-center'>
                <p className='text-2xl'>
                    Welcome to <span className='text-cyan-500 font-bold'>Nero</span>
                </p>
            </div>
            {/*
            <div className="">
                <div className="flex gap-2">
                    <figure className='size-15 border rounded-full bg-gray-700'>
                    </figure>
                    <section className='flex flex-col'>
                        <h2 className="text-xl font-semibold">{user?.username}</h2>
                        <p>{user?.email}</p>
                    </section>
                </div>
            </div>*/}
        </div>
    )
}