const { Sequelize } = require('sequelize');
// const Item = require('../models/Item');

// Item.hasOne(Banking);

module.exports = new Sequelize('books', 'thiago', 'Mkbm@@1401', {
  host: 'localhost',
  dialect: 'mysql',
});
