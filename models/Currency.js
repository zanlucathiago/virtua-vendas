const Sequelize = require('sequelize');
const db = require('../config/database');

const Currency = db.define('currency', {
  code: {
    allowNull: false,
    type: Sequelize.ENUM(
      'USD - United States dollar',
      'EUR - Euro',
      'JPY - Japanese yen',
      'GBP - Pound Sterling',
      'AUD - Australian dollar',
      'CAD - Canadian dollar',
      'CHF - Swiss franc',
      'CNY - Renminbi',
      'HKD - Honk Kong dollar',
      'NZD - New Zealand dollar',
      'SEK - Swedish krona',
      'KRW - South Korean won',
      'SGD - Singapore dollar',
      'NOK - Norwegian krone',
      'MXN - Mexican peso',
      'INR - Indian rupee',
      'RUB - Russian ruble',
      'ZAR - South African rand',
      'TRY - Turkish lira',
      'BRL - Brazilian real'
    ),
  },
  symbol: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  name: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
});

// Currency.sync().then(() => console.log('Table synced.'));

module.exports = Currency;
