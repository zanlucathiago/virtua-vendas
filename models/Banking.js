const Sequelize = require('sequelize');
const db = require('../config/database');

const Banking = db.define('banking', {
  displayName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  paymentTerms: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
});

// Customer.sync().then(() => console.log('Table synced.'));

module.exports = Banking;
