import Theme from '@/components/themeToggle'
import Link from 'next/link'
export const Header = () => {

    return (
        <div className='h-[10%] flex justify-between px-4'>
            <h1 className='text-xl text-black dark:text-white'>AV</h1>
            <div className='flex gap-4 items-center'>
                <div>
                    <Link href='/home'>
                        Home
                    </Link>
                </div>
                <div>
                    <Link href="/prompt">
                        Chat
                    </Link>
                </div>
            </div>
            <Theme />
        </div>
    )
}