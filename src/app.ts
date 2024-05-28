import express from 'express';
import phoneRoutes from './routes/phoneRoutes';

const app = express();

app.use(express.json());
app.use('/api/phones', phoneRoutes);


export default app;