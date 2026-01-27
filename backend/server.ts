import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import uploadRoutes from './src/routes/uploadRoutes';
import apikeyRoutes from './src/routes/apikeyRoutes';


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/upload',uploadRoutes);
app.use('/apikey',apikeyRoutes);

app.listen(port, () => {  
  console.log(`Server is running on port ${port}`);
});

export default app;