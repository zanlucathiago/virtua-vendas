const Sequelize = require('sequelize');
const db = require('../config/database');
// const Currency = require('./Currency');

const Terms = db.define('terms', {
  // currency: {
  //   allowNull: false,
  //   type
  // },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  days: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  // type: {
  //   allowNull: false,
  //   type: Sequelize.ENUM('BUSINESS', 'INDIVIDUAL'),
  // },
});

// Currency.hasOne(Customer);
// Customer.sync().then(() => console.log('Table synced.'));

module.exports = Terms;
