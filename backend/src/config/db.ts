import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { initUser } from '../models/user';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'finsim',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();

    console.log('Connection has been established successfully.');

    initUser(sequelize);
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;