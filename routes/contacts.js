const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const Customer = require('../models/Customer');

const pp = 10;

const router = express.Router();

router.get('/', ensureAuth, (req, res) => {
  const { p } = req.query;

  Customer.findAndCountAll({
    limit: pp,
    offset: p ? pp * (parseInt(p, 10) - 1) : 0,
    raw: true,
  })
    .then(({ count, rows }) => {
      res.render('contacts', {
        a: p,
        rp: Math.ceil(count / pp),
        contacts: rows.map((c) => ({
          ...c,
          debit: 'R$ 0,00',
          credit: 'R$ 0,00',
        })),
        redirecturl: 'contacts',
        title: 'Clientes',
        version: process.env.npm_package_version,
      });
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
});

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
      res.status(201).json({ msg: 'Cliente criado.' });
    })
    .catch((err) => {
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
        res.status(201).json({ msg: 'Cliente alterado.' });
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  });
});

router.post('/delete', ensureAuth, (req, res) => {
  const id = JSON.parse(req.body.modaldeleteids);

  Customer.destroy({ where: { id } })
    .then(() => {
      res.status(200).json({ msg: 'Cliente(s) excluído(s).' });
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
});

module.exports = router;
