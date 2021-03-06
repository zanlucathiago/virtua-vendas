const express = require('express');
// const db = require('../config/database');
// const Account = require('../models/Account');
// const Banking = require('../models/Banking');
// const Currency = require('../models/Currency');
const Item = require('../models/Item');
// const Invoice = require('../models/Invoice');
// const Invoiceitem = require('../models/Invoiceitem');
// const Item = require('../models/Item');
// const Terms = require('../models/Terms');

const router = express.Router();

router.get('/', (req, res) =>
  Item.findAll({ raw: true })
    .then((inventory) => {
      res.render('inventory', {
        inventory,
      });
    })
    .catch((err) => console.log(err))
);

router.post('/add', (req, res) => {
  const { displayName, paymentTerms } = req.body;

  Item.create({ displayName, paymentTerms }).then(() => {
    res.redirect('/inventory');
  });
});

router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  Item.destroy({ where: { id } }).then(() => res.redirect('/inventory'));
});

module.exports = router;
