const Sequelize = require('sequelize');
const db = require('../config/database');

const Item = db.define('item', {
  type: {
    allowNull: false,
    type: Sequelize.STRING,
    // type: Sequelize.ENUM('GOODS', 'SERVICE'),
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  usageUnit: {
    allowNull: true,
    type: Sequelize.STRING,
    // type: Sequelize.ENUM(
    //   '',
    //   'G',
    //   'JOGO',
    //   'LT',
    //   'MWHORA',
    //   'METRO',
    //   'M3',
    //   'M2',
    //   '1000UN',
    //   'PARES',
    //   'QUILAT',
    //   'KG',
    //   'UN'
    // ),
  },
  class: {
    allowNull: false,
    type: Sequelize.STRING,
    // type: Sequelize.ENUM('SALE', 'PURCHASE', 'SALE_AND_PURCHASE'),
  },
  sellingPrice: {
    allowNull: false,
    type: Sequelize.DECIMAL(10, 4),
  },
  purchasePrice: {
    allowNull: false,
    type: Sequelize.DECIMAL(10, 4),
  },
  sellingAccount: {
    allowNull: false,
    type: Sequelize.STRING,
    // type: Sequelize.ENUM(
    //   'DISCOUNT',
    //   'GENERAL_INCOME',
    //   'INTEREST_INCOME',
    //   'LATE_FEE_INCOME',
    //   'OTHER_CHARGES',
    //   'SALES',
    //   'SHIPPING_CHARGE'
    // ),
  },
  purchaseAccount: {
    allowNull: false,
    type: Sequelize.STRING,
    // type: Sequelize.ENUM('COST_OF_GOODS_SOLD'),
  },
  sellingDescription: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  purchaseDescription: {
    allowNull: true,
    type: Sequelize.STRING,
  },
});

module.exports = Item;
