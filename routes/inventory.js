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
          usageUnitLabel: services.getUsageUnit(i.usageUnit),
          isGoods: i.type === 'GOODS',
          isService: i.type === 'SERVICE',
        })),
        redirecturl: 'inventory',
        title: 'Inventário',
        version: process.env.npm_package_version,
      });
    })
    .catch((e) => {
      res.status(400).json({ msg: e.message });
    });
});

router.post('/add', ensureAuth, (req, res) => {
  const {
    itemClass,
    type,
    name,
    usageUnit,
    sellingPrice,
    purchasePrice,
    sellingAccount,
    purchaseAccount,
    sellingDescription,
    purchaseDescription,
  } = req.body;

  Item.create({
    class: itemClass,
    type,
    name,
    usageUnit,
    sellingPrice,
    purchasePrice,
    sellingAccount,
    purchaseAccount,
    sellingDescription,
    purchaseDescription,
  })
    .then(() => {
      res.status(201).json({ msg: 'Produto criado.' });
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
});

router.post('/edit/:id', ensureAuth, (req, res) => {
  const {
    itemClass,
    type,
    name,
    usageUnit,
    sellingPrice,
    purchasePrice,
    sellingAccount,
    purchaseAccount,
    sellingDescription,
    purchaseDescription,
  } = req.body;

  const { id } = req.params;

  Item.findByPk(id).then((item) => {
    item
      .update({
        class: itemClass,
        type,
        name,
        usageUnit,
        sellingPrice,
        purchasePrice,
        sellingAccount,
        purchaseAccount,
        sellingDescription,
        purchaseDescription,
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
