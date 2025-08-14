'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Nero from '@/images/nero.png'
import Link from "next/link";
import api from '@/lib/api'
import GoogleLoginButton from "@/components/googleLoginbtn";
import useUser from "@/hook/useUser";
import '../app/globals.css'

export default function Login() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('')
    const { user } = useUser();
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/token/', {
                username: credentials.username,
                password: credentials.password,
            });

            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            router.push('/home');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Network error, please try again later.');
        }
    };

    useEffect(()=>{
        if(user){
            router.push('/home')
        }
    },[user])
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 rounded-lg px-8 py-6 grid md:grid-cols-2 gap-3 shadow-md">
                <div className="flex flex-col items-center justify-center">
                    <Image
                        src={Nero}
                        alt="Nero"
                        priority={true}
                        className="animate-custom-bounce"
                    />
                    <p className="text-center text-black dark:text-white">Hi, I'm <span className="font-bold text-cyan-500">Nero</span><br />

                    </p>
                </div>
                <div className="w-75">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-center text-xl text-black dark:text-white font-bold">Log in</h1>
                        {error && <div className="mb-2 text-center text-red-500 text-sm">{error}</div>}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-black dark:text-gray-500 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 bg-transparent"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-black dark:text-gray-400 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-cyan-500 text-black dark:text-white py-2 px-4 rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-4 text-sm text-black dark:text-white">
                        Don't have an account? <Link href="/register" className="text-cyan-500 hover:underline">Register</Link>
                    </div>
                    <div className="w-full flex itesm-center justyfy-conter">
                        <span className=" border-b border-gray-300 w-[50%]"></span>
                        <span className="text-md text-center">or</span>
                        <span className="border-b border-b-gray-300 w-[50%]"></span>
                    </div>
                    <GoogleLoginButton />
                </div>
            </div>
        </div>
    )
}