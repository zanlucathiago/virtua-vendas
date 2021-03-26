const Sequelize = require('sequelize');
const db = require('../config/database');
const Payment = require('./Payment');

const Invoicepayment = db.define(
  'invoicepayment',
  {
    value: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

Invoicepayment.belongsTo(Payment);
Payment.Invoicepayments = Payment.hasMany(Invoicepayment);

module.exports = Invoicepayment;
