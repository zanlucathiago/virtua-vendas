const Sequelize = require('sequelize');
const db = require('../config/database');
const Customer = require('./Customer');
// const Terms = require('./Terms');

const Invoice = db.define('invoice', {
  date: {
    allowNull: false,
    type: Sequelize.DATEONLY,
  },
  number: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  order: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  status: {
    allowNull: false,
    type: Sequelize.ENUM(
      'DRAFT',
      'PENDING_APPROVAL',
      'ACCEPTED',
      'REJECTED',
      'SENT',
      'PARTIALLY_PAID',
      'PAID',
      'OVERDUE'
    ),
  },
  dueDate: {
    allowNull: false,
    type: Sequelize.DATEONLY,
  },
});

Customer.hasOne(Invoice);
/**
 * TODO: Desenvolver domain Terms.
 */
// Terms.hasOne(Invoice);

module.exports = Invoice;
