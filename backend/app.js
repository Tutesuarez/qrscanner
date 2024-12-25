import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from './src/config/database.js';
import qrRoutes from './src/routes/qrRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const PORTF = process.env.PORTF
// Middleware
app.use(cors()); // Habilitar CORS para que el frontend en Vite pueda interactuar
app.use(express.json()); // Parseo de JSON en las solicitudes

// Resolver rutas actuales
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware CORS optimizado
const allowedOrigins = [`${PORTF}`];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware JSON
app.use(express.json());

// Rutas
app.use('/api/qr', qrRoutes); // Rutas para la API de QR

// Servir archivos estáticos (opcional)
app.use(express.static(path.join(__dirname, 'public')));

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
