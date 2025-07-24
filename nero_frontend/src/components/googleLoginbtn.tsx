'use client';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import googleIcon from '@/images/google.svg';
import api from '@/lib/api';

export default function GoogleLoginButton() {
  const router = useRouter();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await api.post('/api/auth/google/', {access_token: tokenResponse.access_token,});
        console.log("Google login successful:", response.data);
        localStorage.setItem('token', response.data.token);
        router.push('/home');
      } catch (error) {
        console.error("error during Google login:", error);
      }
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  return (
    <div className="mt-4">
      <button
        onClick={() => login()}
        className="text-black dark:text-white flex items-center justify-center border rounded-lg border-gray-300 py-2 gap-2 w-full active:border-cyan-500"
      >
        <Image height={20} width={20} src={googleIcon} alt="google-icon" />
        Continue with Google
      </button>
    </div>
  );
}