const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

const getAll = (req, res) => {
  Item.findAll({ raw: true })
    .then((inventory) => {
      res.render('inventory', {
        inventory: inventory.map((i) => ({
          ...i,
          sellingPrice: `R$ ${(i.sellingPrice / 100).toFixed(2)}`,
        })),
      });
    })
    .catch((err) => console.log(err));
};

router.get('/', getAll);

router.get('/delete', getAll);

router.get('/edit', getAll);

router.get('/add', getAll);

router.post('/add', (req, res) => {
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
    sellingPrice: 100 * parseFloat(sellingPrice),
    type,
    usageUnit,
  })
    .then(() => {
      res.redirect('/inventory/add');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/delete', (req, res) => {
  const id = JSON.parse(req.body.modaldeleteids);
  Item.destroy({ where: { id } }).then(() => res.redirect('/inventory/delete'));
});

router.post('/edit/:id', (req, res) => {
  const {
    account,
    description,
    name,
    sellingPrice,
    type,
    usageUnit,
  } = req.body;

  const { id } = req.params;
  // const id = JSON.parse(req.body.modaldeleteids);
  Item.findByPk(id).then((item) => {
    item
      .update({
        account,
        description,
        name,
        sellingPrice: 100 * parseFloat(sellingPrice),
        type,
        usageUnit,
      })
      .then(() => {
        res.redirect('/inventory/edit');
      });
  });
  // Item.destroy({ where: { id } }).then(() => res.redirect('/inventory/delete'));
});

module.exports = router;
