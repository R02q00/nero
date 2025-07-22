'use client';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import googleIcon from '@/images/google.svg';

export default function GoogleLoginButton() {
  const router = useRouter();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Envoyer le token au backend Django
        const res = await fetch('http://localhost:8000/api/auth/google/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token: tokenResponse.access_token }),
        });

        const data = await res.json();

        if (res.ok) {
          // Stocker le token JWT retourné par Django
          localStorage.setItem('token', data.token);
          router.push('/dashboard');
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Login failed:', error);
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
        className="text-black dark:text-white flex items-center justify-center border rounded-lg border-gray-300 py-2 gap-2 w-full"
      >
        <Image height={20} width={20} src={googleIcon} alt="google-icon" />
        Continue with Google
      </button>
    </div>
  );
}