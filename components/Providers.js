'use client';

import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleOneTap from '@/components/GoogleOneTap';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ToastContainer />
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <GoogleOneTap /> {/* 👈 this will auto-trigger popup */}
        {children}
      </GoogleOAuthProvider>
    </SessionProvider>
  );
}
