// app.js
import express from 'express';
import magicLinkRoutes from './routes/magicLink.routes.js';
import templateRoutes from './routes/templateRoutes.js'
import cors from 'cors';

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/magic-link', magicLinkRoutes);
app.use('/template', templateRoutes);

// Handle OPTIONS requests for CORS preflight


export default app;