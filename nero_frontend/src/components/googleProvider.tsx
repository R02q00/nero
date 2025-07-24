'use client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
export function GoogleProvider({ children }: { children: React.ReactNode }) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID;
    if (!clientId) {
        console.error('Google OAuth2 Client ID is not defined in environment variables.');
        return <>{children}</>
    }

    return (
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID}`}>
            {children}
        </GoogleOAuthProvider>
    );

}