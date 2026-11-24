export interface Candle {
  id: string;        // Generado automáticamente por Firestore
  name: string;      // Nombre de quien enciende la vela (2 - 50 caracteres)
  message: string;   // Dedicatoria que se abre en el modal (5 - 600 caracteres)
  x: number;         // Coordenada horizontal en porcentaje (0 a 100)
  y: number;         // Coordenada vertical en porcentaje (0 a 100)
  createdAt: number; // Timestamp del servidor (serverTimestamp)
}

export interface PendingCandle {
  x: number;
  y: number;
}
