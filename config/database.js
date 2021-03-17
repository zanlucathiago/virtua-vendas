const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  process.env.DATABASE_URL ||
    'postgres://postgres:postgres@localhost:5432/postgres',
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: { rejectUnauthorized: false, require: true },
    },
  }
);
