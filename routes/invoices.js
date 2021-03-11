const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const Customer = require('../models/Customer');
const Invoice = require('../models/Invoice');
const Item = require('../models/Item');

const router = express.Router();

router.get('/', ensureAuth, (req, res) =>
  Invoice.findAll({ raw: true })
    .then((invoices) => {
      res.render('invoices', {
        invoices,
      });
    })
    .catch((err) => console.log(err))
);

router.get('/resources', ensureAuth, async (req, res) => {
  const customers = await Customer.findAll({ raw: true });
  const products = await Item.findAll({ raw: true });
  res.json({ customers, products });
});

router.post('/add', ensureAuth, (req, res) => {
  const { name, paymentTerms } = req.body;

  Invoice.create({ name, paymentTerms }).then(() => {
    res.redirect('/invoices');
  });
});

router.post('/delete/:id', ensureAuth, (req, res) => {
  const { id } = req.params;
  Invoice.destroy({ where: { id } }).then(() => res.redirect('/invoices'));
});

module.exports = router;
