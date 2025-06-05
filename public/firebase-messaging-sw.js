importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDvGH8wVg4w5ofmau2__XEJsu0ECdEqHdA",
  authDomain: "aktubrand.firebaseapp.com",
  projectId: "aktubrand",
  storageBucket: "akt4ubrand.firebasestorage.app",
  messagingSenderId: "49099459964542",
  appId: "1:49095699964542:web:3be22c6b9eae78558a892f",
  measurementId: "G-9MsdfDKPZJGYW"
});
const messaging = firebase.messaging();

// ✅ Background notification handler
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  const { title, body } = payload.notification;
  const link = payload.data?.click_action || payload.data?.link || '/';

  self.registration.showNotification(title, {
    body: body,
    icon: "/assets/logo.png",
    data: {
      click_action: link,
    },
  });
});

// ✅ Handle click on notification
self.addEventListener('notificationclick', function (event) {
  const click_action = event.notification?.data?.click_action;

  event.notification.close();

  if (click_action) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
        for (const client of clientList) {
          if (client.url === click_action && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(click_action);
        }
      })
    );
  }
});