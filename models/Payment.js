const Sequelize = require('sequelize');
const db = require('../config/database');

const Payment = db.define('payment', {
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
  reference: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  account: {
    allowNull: false,
    type: Sequelize.STRING,
    // type: Sequelize.ENUM(
    //   'TROCO_DE_CAIXA',
    //   'FUNDOS_NAO_DEPOSITADOS',
    //   'REEMBOLSO_DE_FUNCIONARIO',
    //   'AJUSTES_DE_SALDO_DE_ABERTURA'
    // ),
  },
  mode: {
    allowNull: false,
    type: Sequelize.STRING,
    // type: Sequelize.ENUM(
    //   'BANK_REMITTANCE',
    //   'BANK_TRANFER',
    //   'CASH',
    //   'CHECK',
    //   'CREDIT_CARD'
    // ),
  },
  value: {
    allowNull: true,
    type: Sequelize.DECIMAL(10, 4),
  },
});

module.exports = Payment;
