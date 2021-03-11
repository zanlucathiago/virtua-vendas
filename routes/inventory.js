const express = require('express');
const { ensureAuth } = require('../middleware/auth');
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

router.get('/', ensureAuth, getAll);

router.get('/delete', ensureAuth, getAll);

router.get('/edit', ensureAuth, getAll);

router.get('/add', ensureAuth, getAll);

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
    sellingPrice: 100 * parseFloat(sellingPrice),
    type,
    usageUnit,
  })
    .then(() => {
      res.redirect('/inventory/add');
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: err.message });
    });
});

router.post('/delete', ensureAuth, (req, res) => {
  const id = JSON.parse(req.body.modaldeleteids);
  Item.destroy({ where: { id } }).then(() => res.redirect('/inventory/delete'));
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
        sellingPrice: 100 * parseFloat(sellingPrice),
        type,
        usageUnit,
      })
      .then(() => {
        res.redirect('/inventory/edit');
      });
  });
});

module.exports = router;
