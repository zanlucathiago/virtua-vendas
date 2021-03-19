const Sequelize = require('sequelize');
const db = require('../config/database');
const Invoiceitem = require('./Invoiceitem');
const Invoicepayment = require('./Invoicepayment');

const Invoice = db.define('invoice', {
  date: {
    allowNull: false,
    set(value) {
      const [day, month, year] = value.split('/');
      this.setDataValue('date', new Date(year, month - 1, day));
    },
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
    type: Sequelize.STRING,
    // type: Sequelize.ENUM(
    //   'DRAFT',
    //   'PENDING_APPROVAL',
    //   'ACCEPTED',
    //   'REJECTED',
    //   'SENT',
    //   'PARTIALLY_PAID',
    //   'PAID',
    //   'OVERDUE'
    // ),
  },
  paymentTerms: {
    allowNull: false,
    type: Sequelize.STRING,
    // type: Sequelize.ENUM('15D', '30D', '45D', '60D', '0D', '0M', '1M'),
  },
  dueDate: {
    allowNull: false,
    set(value) {
      const [day, month, year] = value.split('/');
      this.setDataValue('dueDate', new Date(year, month - 1, day));
    },
    type: Sequelize.DATEONLY,
  },
});

Invoicepayment.belongsTo(Invoice);
Invoice.Invoicepayments = Invoice.hasMany(Invoicepayment);
Invoiceitem.belongsTo(Invoice);
Invoice.Invoiceitems = Invoice.hasMany(Invoiceitem);

module.exports = Invoice;
