const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const Item = require('../models/Item');
const services = require('../services/services');

const router = express.Router();

router.get('/', ensureAuth, (req, res) => {
  const { p } = req.query;

  Item.findAndCountAll({ raw: true })
    .then(({ count, rows }) => {
      res.render('inventory', {
        a: p,
        rp: Math.ceil(count / services.pp),
        inventory: rows.map((i) => ({
          ...i,
          sellingPriceLabel: services.getPrice(i.sellingPrice),
        })),
        redirecturl: 'inventory',
        title: 'Inventário',
      });
    })
    .catch((e) => {
      res.status(400).json({ msg: e.message });
    });
});

router.post('/add', ensureAuth, (req, res) => {
  const {
    account,
    description,
    name,
    sellingPrice,
    type,
    usageUnit,
  } = req.body;

  Item.create({
    account,
    description,
    name,
    sellingPrice,
    type,
    usageUnit,
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
    account,
    description,
    name,
    sellingPrice,
    type,
    usageUnit,
  } = req.body;

  const { id } = req.params;

  Item.findByPk(id).then((item) => {
    item
      .update({
        account,
        description,
        name,
        sellingPrice,
        type,
        usageUnit,
      })
      .then(() => {
        res.status(201).json({ msg: 'Produto alterado.' });
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  });
});

router.post('/delete', ensureAuth, (req, res) => {
  const id = JSON.parse(req.body.modaldeleteids);

  Item.destroy({ where: { id } })
    .then(() => {
      res.status(200).json({ msg: 'Produto(s) excluído(s).' });
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
});

module.exports = router;
