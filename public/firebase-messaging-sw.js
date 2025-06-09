// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDvGH8wVg4w5ofmau2__XEJsu0ECdEqHdA",
  authDomain: "aktubrand.firebaseapp.com",
  projectId: "aktubrand",
  storageBucket: "aktubrand.firebasestorage.app", // Corrected storageBucket if typo
  messagingSenderId: "49099459964542",
  appId: "1:49095699964542:web:3be22c6b9eae78558a892f",
  measurementId: "G-9MsdfDKPZJGYW"
});
const messaging = firebase.messaging();

// ✅ Background notification handler
messaging.onBackgroundMessage((payload) => {
  console.log("✅ Payload received in SW:", payload);

  const { title, body } = payload.data;
  const click_action = payload.data?.click_action || '/'; // Default to root if not provided

  self.registration.showNotification(title, {
    body,
    icon: "/assets/logo.png",
    data: {
      click_action, // Pass the click_action URL to the notification's data
    },
  });
});


// ✅ Handle click on notification
self.addEventListener('notificationclick', function (event) {
  const click_action = event.notification?.data?.click_action; // Retrieve click_action from notification data

  event.notification.close(); // Close the notification

  if (click_action) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
        for (const client of clientList) {
          if (client.url === click_action && 'focus' in client) {
            // If the tab is already open at the target URL, focus on it
            return client.focus();
          }
        }
        // Otherwise, open a new window/tab
        if (clients.openWindow) {
          return clients.openWindow(click_action);
        }
      })
    );
  }
});