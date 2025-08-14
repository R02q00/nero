import Theme from '@/components/themeToggle'
import Link from 'next/link'
import useUser from '@/hook/useUser'

export const Header = () => {
    const { user, loading, error } = useUser();

    return (
        <div className={`h-15 flex justify-between px-4 dark:bg-gray-900 ${!loading ? 'hidden' : 'block'}`}>
            <h1 className='text-xl text-black dark:text-white'>Nero</h1>
            <div className='flex gap-4 items-center'>
                <div>
                    <Link href='/home'>
                        Home
                    </Link>
                </div>
                <div>
                    <Link href="/prompt">
                        Prompt
                    </Link>
                </div>
            </div>
            <Theme />
        </div>
    )
}