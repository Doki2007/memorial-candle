import { initializeApp } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'

// ⚠️  Reemplaza estos valores con los de tu proyecto Firebase
// Firebase Console → Project Settings → Your apps → SDK setup and configuration
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || 'AIzaSyCMAll9F-sWJSgK0T5TB8Z149u73fFY2B8',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || 'velita-memorial.firebaseapp.com',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || 'velita-memorial',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || 'velita-memorial.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1095773149025',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || '1:1095773149025:web:424aefd91d1f6af211d720',
}

const app  = initializeApp(firebaseConfig)

// experimentalForceLongPolling resuelve el problema de canales colgados en navegadores web y proxies de Vercel
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
})
export const auth = getAuth(app)

// Autenticación anónima automática al arrancar
export function initAnonymousAuth (): Promise<string> {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid)
      } else {
        signInAnonymously(auth).then((cred) => resolve(cred.user.uid))
      }
    })
  })
}
