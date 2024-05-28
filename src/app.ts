import express from 'express';
import sequelize from './config/database';
import phoneRoutes from './routes/phoneRoutes';

const app = express();

app.use(express.json());
app.use('/api/phones', phoneRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err: any) => {
    console.log('Error: ' + err);
  });

export default app;