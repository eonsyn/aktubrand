// /lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

// ✅ Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvGH8wVg4w5ofmau2__XEJsu0ECdEqHdA",
  authDomain: "aktubrand.firebaseapp.com",
  projectId: "aktubrand",
  storageBucket: "aktubrand.firebasestorage.app",
  messagingSenderId: "490999964542",
  appId: "1:490999964542:web:3be22c6b9eae78558a892f",
  measurementId: "G-9MDKPZJGYW",
};

// ✅ Initialize the Firebase app safely (prevents multiple inits)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Lazy initialization for messaging — avoids mobile crashes
let messagingPromise = null;

export const getMessagingInstance = async () => {
  if (typeof window === "undefined") return null;

  if (!messagingPromise) {
    messagingPromise = isSupported()
      .then((supported) => {
        if (supported) {
          const messaging = getMessaging(app);
          console.log("✅ Firebase Messaging initialized");
          return messaging;
        } else {
          console.warn("⚠️ Firebase Messaging not supported on this device/browser");
          return null;
        }
      })
      .catch((err) => {
        console.error("❌ Error checking Firebase Messaging support:", err);
        return null;
      });
  }

  return messagingPromise;
};

export { app, getToken, onMessage };
