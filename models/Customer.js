const Sequelize = require('sequelize');
const db = require('../config/database');
const Currency = require('./Currency');

const Customer = db.define('customer', {
  // currency: {
  //   allowNull: false,
  //   type
  // },
  displayName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  paymentTerms: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  type: {
    allowNull: false,
    type: Sequelize.ENUM('BUSINESS', 'INDIVIDUAL'),
  },
});

Currency.hasOne(Customer);
// Customer.sync().then(() => console.log('Table synced.'));

module.exports = Customer;
