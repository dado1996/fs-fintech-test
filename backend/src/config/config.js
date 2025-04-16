
    require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') }); // Adjust path as necessary
    const path = require('path');

    module.exports = {
      development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres'
      },
      test: {
        // ... add test environment config if needed
      },
      production: {
        // ... add production environment config if needed
      }
    };
    