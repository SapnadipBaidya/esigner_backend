import app from './app.js';
import { PORT } from './config/index.js';
import cors from 'cors';



app.use(cors({
  origin: '*', // Replace with actual frontend origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.get('/health-check', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



