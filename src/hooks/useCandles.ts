import { useState, useEffect, useMemo } from 'react'
import { subscribeCandles } from '../lib/candles'
import type { Candle } from '../types/candle'

export function useCandles (searchQuery: string) {
  const [candles, setCandles] = useState<Candle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = subscribeCandles((data) => {
      setCandles(data)
      setLoading(false)
    })
    return unsub
  }, [])

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return candles
    return candles.filter((c) =>
      c.name.toLowerCase().includes(q),
    )
  }, [candles, searchQuery])

  return { candles, filtered, loading, total: candles.length }
}
