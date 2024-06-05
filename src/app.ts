import express from 'express';
import cors from 'cors';
import phoneRoutes from './routes/phoneRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/phones', phoneRoutes);


export default app;