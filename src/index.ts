import dotenv from 'dotenv';
import app from './app';
import sequelize from './config/database';

dotenv.config();

const port = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Unable to sync the database:', error);
});