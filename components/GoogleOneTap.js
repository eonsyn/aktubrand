'use client';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';

export default function GoogleOneTap() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) return; // Don't show if already signed in

    // Dynamically load the Google script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: async (response) => {
            // Trigger NextAuth sign-in using Google
            await signIn('google', {
              credential: response.credential,
              redirect: false,
            });
          },
        });

        window.google.accounts.id.prompt(); // shows popup
      }
    };

    document.body.appendChild(script);
  }, [session]);

  return null;
}
