import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Candle } from '../types/candle'

const COL = 'candles'

/** Suscripción en tiempo real a todas las velas */
export function subscribeCandles (
  onUpdate: (candles: Candle[]) => void,
): Unsubscribe {
  const q = query(collection(db, COL), orderBy('createdAt', 'asc'))
  return onSnapshot(q, (snap) => {
    const candles: Candle[] = snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Candle, 'id'>),
    }))
    onUpdate(candles)
  })
}

/** Agrega una vela nueva a Firestore */
export async function addCandle (
  name: string,
  message: string,
  x: number,
  y: number,
): Promise<void> {
  await addDoc(collection(db, COL), {
    name: name.trim().slice(0, 50),
    message: message.trim().slice(0, 600),
    x,
    y,
    createdAt: serverTimestamp(),
  })
}
