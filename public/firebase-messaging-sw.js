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

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/assets/logo.png",
  });
});
