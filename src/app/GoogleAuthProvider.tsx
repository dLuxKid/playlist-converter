'use client'

import { GoogleOAuthProvider } from '@react-oauth/google';


export default function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_YT_client_id as string}>{children}</GoogleOAuthProvider>
    )
}

