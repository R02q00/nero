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
        if (!error) {
            router.push('/');
        }
    }, [loading, user, router])

    return (
        <div className='h-[90%] dark:bg-gray-900'>
            {/*<div className="">
                <div className="">
                    <figure className='size-15 border rounded-full bg-gray-700'>
                        
                    </figure>
                    <section className='flex flex-col'>
                        <h2 className="text-xl font-semibold">{user?.username}</h2>
                        <p>{user?.email}</p>
                    </section>
                </div>
            </div>*/}
            <div className='h-[90%] flex flex-col items-center justify-center gap-4'>
                <p className='text-center text-xl'>
                    Welcome to <span className='text-cyan-500 font-bold'>Nero</span><br />
                    I'am a simple AI assistant, you can ask me anything.
                </p>
            </div>
            
        </div>
    )
}