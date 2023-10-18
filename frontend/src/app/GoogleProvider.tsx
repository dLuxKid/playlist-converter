'use client'

import { GoogleOAuthProvider } from '@react-oauth/google';

interface Props {
    children: React.ReactNode
}

export default function GoogleProvider({ children }: Props) {
    return (
        <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_YT_client_id ?? ""}
        >
            {children}
        </GoogleOAuthProvider>
    )
}
