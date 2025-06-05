'use client';

import { useEffect } from 'react';
import { messaging, getToken, onMessage } from '@/lib/firebase';

export default function PushNotifications() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker Registered');

          getToken(messaging, {
            vapidKey: process.env.VAPID_KEY, // Replace with your Firebase VAPID key
            serviceWorkerRegistration: registration,
          }).then((token) => {
            if (token) {
              console.log("FCM Token:", token);
              fetch('/api/admin/notification/save-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
              });
            } else {
              console.warn('No FCM token available');
            }
          });
        });
    }

    onMessage(messaging, (payload) => {
      alert(`🔔 ${payload.notification.title}: ${payload.notification.body}`);
    });
  }, []);

  return null;
}

 