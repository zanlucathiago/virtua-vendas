const Sequelize = require('sequelize');
const db = require('../config/database');
/**
 * TODO: Implementar domain Currency.
 */
// const Currency = require('./Currency');

const Customer = db.define('customer', {
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  company: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  email: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  phone: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  currency: {
    allowNull: false,
    type: Sequelize.ENUM(
      'BRL',
      'USD',
      'EUR',
      'JPY',
      'GBP',
      'AUD',
      'CAD',
      'CHF',
      'CNY',
      'HKD',
      'NZD',
      'SEK',
      'KRW',
      'SGD',
      'NOK',
      'MXN',
      'INR',
      'RUB',
      'ZAR',
      'TRY'
    ),
  },
  paymentTerms: {
    allowNull: false,
    type: Sequelize.ENUM('15D', '30D', '45D', '60D', '0D', '0M', '1M'),
  },
  type: {
    allowNull: false,
    type: Sequelize.ENUM('BUSINESS', 'INDIVIDUAL'),
  },
});

/**
 * TODO: Implementar domain Currency.
 */
// Currency.hasOne(Customer);

module.exports = Customer;
