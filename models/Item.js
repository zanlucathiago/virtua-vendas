const Sequelize = require('sequelize');
const db = require('../config/database');
// const Invoiceitem = require('./Invoiceitem');
// const Banking = require('./Banking');

const Item = db.define('item', {
  type: {
    allowNull: false,
    type: Sequelize.ENUM('GOODS', 'SERVICE'),
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  usageUnit: {
    allowNull: true,
    type: Sequelize.ENUM(
      '',
      'G',
      'JOGO',
      'LT',
      'MWHORA',
      'METRO',
      'M3',
      'M2',
      '1000UN',
      'PARES',
      'QUILAT',
      'KG',
      'UN'
    ),
  },
  sellingPrice: {
    allowNull: false,
    type: Sequelize.DECIMAL(10, 4),
  },
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
  description: {
    allowNull: true,
    type: Sequelize.STRING,
  },
});

module.exports = Item;
