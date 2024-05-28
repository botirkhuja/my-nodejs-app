import dotenv from 'dotenv';
import app from './app';
import sequelize from './config/database';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

const port = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    sequelize.sync({ alter: true }).then(() => {
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    }).catch((error) => {
      throw Error('Unable to sync the database: ' + error);
    });
  })
  .catch((err: any) => {
    console.log('Error: ' + err);
  });