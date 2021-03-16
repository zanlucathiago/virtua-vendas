const { Sequelize } = require('sequelize');

// module.exports = new Sequelize(process.env.DATABASE_URL);

// module.exports = new Sequelize('books', 'thiago', 'Mkbm@@1401', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

module.exports = new Sequelize('books', 'thiago', 'Mkbm@@1401', {
  host: process.env.DATABASE_URL,
  dialect: 'mysql',
});
