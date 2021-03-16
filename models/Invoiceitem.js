const Sequelize = require('sequelize');
const db = require('../config/database');
const Invoice = require('./Invoice');
const Item = require('./Item');

const Invoiceitem = db.define('invoiceitem', {
  quantity: {
    allowNull: true,
    type: Sequelize.DECIMAL(10, 4),
  },
  unitPrice: {
    allowNull: true,
    type: Sequelize.DECIMAL(10, 4),
  },
});

Invoiceitem.belongsTo(Item);
Item.Invoiceitems = Item.hasMany(Invoiceitem);

module.exports = Invoiceitem;
