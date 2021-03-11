const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const Customer = require('../models/Customer');

const router = express.Router();

router.get('/', ensureAuth, (req, res) =>
  Customer.findAll({ raw: true })
    .then((contacts) => {
      res.render('contacts', {
        contacts: contacts.map((c) => ({
          ...c,
          debit: 'R$ 0,00',
          credit: 'R$ 0,00',
        })),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: err.message });
    })
);

router.post('/add', ensureAuth, (req, res) => {
  const {
    company,
    currency,
    name,
    email,
    paymentTerms,
    phone,
    type,
  } = req.body;

  Customer.create({
    company,
    currency,
    name,
    email,
    paymentTerms,
    phone,
    type,
  })
    .then(() => {
      res.redirect('/contacts');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: err.message });
    });
});

router.post('/edit/:id', ensureAuth, (req, res) => {
  const {
    company,
    currency,
    name,
    email,
    paymentTerms,
    phone,
    type,
  } = req.body;

  const { id } = req.params;

  Customer.findByPk(id).then((item) => {
    item
      .update({
        company,
        currency,
        name,
        email,
        paymentTerms,
        phone,
        type,
      })
      .then(() => {
        res.redirect('/contacts');
      });
  });
});

router.post('/delete', ensureAuth, (req, res) => {
  const id = JSON.parse(req.body.modaldeleteids);
  // const { id } = req.params;
  Customer.destroy({ where: { id } }).then(() => res.redirect('/contacts'));
});

module.exports = router;
