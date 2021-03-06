const Sequelize = require('sequelize');
const db = require('../config/database');
const Invoice = require('./Invoice');
const Item = require('./Item');

const Invoiceitem = db.define('invoiceitem', {
  // currency: {
  //   allowNull: false,
  //   type
  // },
  // displayName: {
  //   allowNull: false,
  //   type: Sequelize.STRING,
  // },
  quantity: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  rate: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
});

Invoiceitem.belongsTo(Invoice);
Item.hasOne(Invoiceitem);
// Customer.sync().then(() => console.log('Table synced.'));

module.exports = Invoiceitem;
