const { Sequelize } = require('sequelize');

module.exports = new Sequelize('books', 'thiago', 'Mkbm@@1401', {
  host: 'localhost',
  dialect: 'mysql',
});
