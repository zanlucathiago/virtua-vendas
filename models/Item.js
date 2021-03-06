const Sequelize = require('sequelize');
const db = require('../config/database');
const Banking = require('./Banking');

const Item = db.define('item', {
  account: {
    allowNull: false,
    type: Sequelize.ENUM(
      'DISCOUNT',
      'GENERAL_INCOME',
      'INTEREST_INCOME',
      'LATE_FEE_INCOME',
      'OTHER_CHARGES',
      'SALES',
      'SHIPPING_CHARGE'
    ),
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  sellingPrice: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  type: {
    allowNull: false,
    type: Sequelize.ENUM('GOODS', 'SERVICE'),
  },
});

// Banking.hasOne(Item);

module.exports = Item;
