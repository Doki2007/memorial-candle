import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  type Unsubscribe,
} from 'firebase/firestore'
import { db, auth } from './firebase'
import { signInAnonymously } from 'firebase/auth'
import type { Candle } from '../types/candle'

const COL = 'candles'

/** Suscripción en tiempo real a todas las velas */
export function subscribeCandles (
  onUpdate: (candles: Candle[]) => void,
): Unsubscribe {
  const q = query(collection(db, COL), orderBy('createdAt', 'asc'))
  return onSnapshot(
    q,
    (snap) => {
      const candles: Candle[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Candle, 'id'>),
      }))
      onUpdate(candles)
    },
    (err) => {
      console.error('Error al escuchar velas de Firestore:', err)
    }
  )
}

/** Agrega una vela nueva a Firestore con timeout de seguridad */
export async function addCandle (
  name: string,
  message: string,
  x: number,
  y: number,
): Promise<void> {
  // Intentar asegurar auth anónimo si no está activo, sin bloquear
  try {
    if (!auth.currentUser) {
      await signInAnonymously(auth)
    }
  } catch (authErr) {
    console.warn('Aviso auth anónimo (continuando):', authErr)
  }

  const writePromise = addDoc(collection(db, COL), {
    name: name.trim().slice(0, 50),
    message: message.trim().slice(0, 600),
    x,
    y,
    createdAt: serverTimestamp(),
  })

  // Timeout de 10s para que la UI nunca se quede congelada en "Encendiendo..."
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Tiempo de espera agotado. Verifica tu conexión.')), 10000)
  )

  await Promise.race([writePromise, timeoutPromise])
}
