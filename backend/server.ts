import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import uploadRoutes from './src/routes/uploadRoutes';
import apikeyRoutes from './src/routes/apikeyRoutes';
import authRoutes from './src/routes/authRoutes';
import mediaRoutes from './src/routes/mediaRoutes';
import analyticsRoutes from './src/routes/analyticsRoutes';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/upload',uploadRoutes);
app.use('/apikey',apikeyRoutes);
app.use('/auth',authRoutes);
app.use('/media',mediaRoutes);
app.use('/analytics',analyticsRoutes);


app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "cloudxs-backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {  
  console.log(`Server is running on port ${port}`);
});

export default app;