const Sequelize = require('sequelize');
const db = require('../config/database');
const Invoice = require('./Invoice');
const Invoiceitem = require('./Invoiceitem');
const Invoicepayment = require('./Invoicepayment');
const Payment = require('./Payment');

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
    type: Sequelize.STRING,
    // type: Sequelize.ENUM(
    //   'BRL',
    //   'USD',
    //   'EUR',
    //   'JPY',
    //   'GBP',
    //   'AUD',
    //   'CAD',
    //   'CHF',
    //   'CNY',
    //   'HKD',
    //   'NZD',
    //   'SEK',
    //   'KRW',
    //   'SGD',
    //   'NOK',
    //   'MXN',
    //   'INR',
    //   'RUB',
    //   'ZAR',
    //   'TRY'
    // ),
  },
  paymentTerms: {
    allowNull: false,
    type: Sequelize.STRING,
    // type: Sequelize.ENUM('15D', '30D', '45D', '60D', '0D', '0M', '1M'),
  },
  type: {
    allowNull: false,
    type: Sequelize.STRING,
    // type: Sequelize.ENUM('BUSINESS', 'INDIVIDUAL'),
  },
});

Invoice.belongsTo(Customer);
Customer.Invoices = Customer.hasMany(Invoice);
Invoicepayment.belongsTo(Customer);
Customer.Invoicepayments = Customer.hasMany(Invoicepayment);
Invoiceitem.belongsTo(Customer);
Customer.Invoiceitems = Customer.hasMany(Invoiceitem);
Payment.belongsTo(Customer);
Customer.Payments = Customer.hasMany(Payment);

module.exports = Customer;
