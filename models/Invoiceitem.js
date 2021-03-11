const Sequelize = require('sequelize');
const db = require('../config/database');
const Invoice = require('./Invoice');
const Item = require('./Item');

const Invoiceitem = db.define('invoiceitem', {
  quantity: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  unitPrice: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
});

Invoiceitem.belongsTo(Invoice);
Item.hasOne(Invoiceitem);

module.exports = Invoiceitem;
