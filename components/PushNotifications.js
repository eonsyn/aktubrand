'use client';

import { useEffect } from 'react';
import { getMessagingInstance, getToken, onMessage } from '@/lib/firebase';

export default function PushNotifications() {
  useEffect(() => {
    let unsubscribe = null;

    async function setupFCM() {
      const messaging = await getMessagingInstance();
      if (!messaging) {
        console.warn('⚠️ Firebase Messaging not available or not supported.');
        return;
      }

      // 1️⃣ Register the service worker
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          console.log('✅ Service Worker Registered');

          // 2️⃣ Get the FCM token
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration,
          });

          if (token) {
            console.log('🔑 FCM Token:', token);

            // 3️⃣ Send token to your backend
            await fetch('/api/admin/notification/save-token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token }),
            });
          } else {
            console.warn('⚠️ No FCM token available (permission denied or blocked).');
          }
        } catch (err) {
          console.error('❌ Error during FCM setup:', err);
        }
      } else {
        console.warn('⚠️ Service workers not supported in this browser.');
      }

      // 4️⃣ Handle foreground messages
      unsubscribe = onMessage(messaging, (payload) => {
        console.log('🔔 Foreground message received:', payload);
        alert(`🔔 ${payload.notification.title}: ${payload.notification.body}`);
      });
    }

    setupFCM();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return null; // No UI element needed
}
