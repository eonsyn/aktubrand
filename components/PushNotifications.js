'use client';
// components/PushNotifications.js
import { useEffect } from 'react';
import { messaging, getToken, onMessage } from '@/lib/firebase'; // Assuming '@/lib/firebase' initializes Firebase

export default function PushNotifications() {
  useEffect(() => {
    // 1. Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker Registered');

          // 2. Get FCM Token
          getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, // Use NEXT_PUBLIC_ prefix for client-side env vars
            serviceWorkerRegistration: registration,
          }).then((token) => {
            if (token) {
              console.log("FCM Token:", token);
              // 3. Send Token to Backend
              fetch('/api/admin/notification/save-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
              });
            } else {
              console.warn('No FCM token available. User may have denied permission or blocked notifications.');
            }
          }).catch((err) => {
            console.error('An error occurred while retrieving token:', err);
          });
        })
        .catch((err) => {
          console.error('Service Worker registration failed:', err);
        });
    }

    // 4. Handle Foreground Messages
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('🔔 Foreground message received:', payload);
      alert(`🔔 ${payload.notification.title}: ${payload.notification.body}`);
      // You can also display a custom in-app notification instead of an alert
    });

    // Clean up on component unmount
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array means this runs once on mount

  return null; // This component doesn't render anything
}