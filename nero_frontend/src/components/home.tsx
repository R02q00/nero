import useUser from '@/hook/useUser';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const { user, loading, error } = useUser();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.push('/');
    };

    return (
        <div>
            <div className='flex flex-col items-center justify-center gap-4'>
                <p className='text-center text-xl'>
                    Welcome to <span className='text-cyan-500 font-bold'>Nero</span><br />
                    I'am a simple AI assistant, you can ask me anything.
                </p>
            </div>
        </div>
    )
}