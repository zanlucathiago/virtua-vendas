const Sequelize = require('sequelize');
const db = require('../config/database');
const Payment = require('./Payment');

const Invoicepayment = db.define('invoicepayment', {
  value: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
});

Invoicepayment.belongsTo(Payment);
Payment.Invoicepayments = Payment.hasMany(Invoicepayment);

module.exports = Invoicepayment;
