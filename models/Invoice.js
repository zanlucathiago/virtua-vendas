const Sequelize = require('sequelize');
const db = require('../config/database');
const Customer = require('./Customer');
const Terms = require('./Terms');

const Invoice = db.define('invoice', {
  // currency: {
  //   allowNull: false,
  //   type
  // },
  number: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  date: {
    allowNull: false,
    type: Sequelize.DATEONLY,
  },
  // terms
  // type: {
  //   allowNull: false,
  //   type: Sequelize.ENUM('BUSINESS', 'INDIVIDUAL'),
  // },
});

Customer.hasOne(Invoice);
Terms.hasOne(Invoice);
// Customer.sync().then(() => console.log('Table synced.'));

module.exports = Invoice;
