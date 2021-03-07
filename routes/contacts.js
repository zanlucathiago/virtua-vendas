const express = require('express');
// const db = require('../config/database');
// const Account = require('../models/Account');
// const Banking = require('../models/Banking');
// const Currency = require('../models/Currency');
const Customer = require('../models/Customer');
// const Invoice = require('../models/Invoice');
// const Invoiceitem = require('../models/Invoiceitem');
// const Item = require('../models/Item');
// const Terms = require('../models/Terms');

const router = express.Router();

router.get('/', (req, res) =>
  Customer.findAll({ raw: true })
    .then((contacts) => {
      res.render('contacts', {
        contacts,
      });
    })
    .catch((err) => console.log(err))
);

router.post('/add', (req, res) => {
  const { displayName, paymentTerms } = req.body;

  Customer.create({ displayName, paymentTerms }).then(() => {
    res.redirect('/contacts');
  });
});

router.post('/delete/:id', (req, res) => {
  const { id } = req.params;

  Customer.destroy({ where: { id } }).then(() => res.redirect('/contacts'));
});

module.exports = router;
