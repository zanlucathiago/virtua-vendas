const express = require('express');
// const db = require('../config/database');
// const Account = require('../models/Account');
// const Banking = require('../models/Banking');
// const Currency = require('../models/Currency');
const Invoice = require('../models/Invoice');
// const Invoice = require('../models/Invoice');
// const Invoiceitem = require('../models/Invoiceitem');
// const Invoice = require('../models/Invoice');
// const Terms = require('../models/Terms');

const router = express.Router();

router.get('/', (req, res) =>
  Invoice.findAll({ raw: true })
    .then((invoices) => {
      res.render('invoices', {
        invoices,
      });
    })
    .catch((err) => console.log(err))
);

router.post('/add', (req, res) => {
  const { displayName, paymentTerms } = req.body;

  Invoice.create({ displayName, paymentTerms }).then(() => {
    res.redirect('/invoices');
  });
});

router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  Invoice.destroy({ where: { id } }).then(() => res.redirect('/invoices'));
});

module.exports = router;
