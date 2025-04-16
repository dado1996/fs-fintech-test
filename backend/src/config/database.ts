
    import { Sequelize } from 'sequelize';
    import dotenv from 'dotenv';
    import path from 'path';

    // Adjust path based on the final structure relative to .env
    dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

    const dbName = process.env.POSTGRES_DB as string;
    const dbUser = process.env.POSTGRES_USER as string;
    const dbPassword = process.env.POSTGRES_PASSWORD as string;
    const dbHost = process.env.DB_HOST as string;
    const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
    const dbDialect = 'postgres'; // Explicitly set

    if (!dbName || !dbUser || !dbPassword || !dbHost) {
      throw new Error('Missing database configuration in environment variables');
    }

    export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      port: dbPort,
      dialect: dbDialect,
      logging: console.log, // Log SQL queries - helpful for debugging N+1 issues
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });

    // Potentially initialize models here or in models/index.ts
    