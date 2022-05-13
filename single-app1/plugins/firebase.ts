import { initializeApp } from 'firebase/app'
import { getAuth } from '@firebase/auth'
export const firebase = initializeApp({
  apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
  authDomain: process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NUXT_ENV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NUXT_ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NUXT_ENV_FIREBASE_APP_ID,
});
export const auth = getAuth(firebase);