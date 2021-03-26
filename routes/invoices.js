const express = require('express');
const { Op } = require('sequelize');
const { ensureAuth } = require('../middleware/auth');
const services = require('../services/services');
const db = require('../config/database');
const Invoice = require('../models/Invoice');
const Invoiceitem = require('../models/Invoiceitem');
const Item = require('../models/Item');
const Customer = require('../models/Customer');
const Invoicepayment = require('../models/Invoicepayment');

const router = express.Router();

router.get('/', ensureAuth, (req, res) => {
  const { p } = req.query;
  // debugger;
  Invoice.schema(req.user.tenant)
    .findAndCountAll({
      include: [
        {
          model: Customer.schema(req.user.tenant),
          attributes: ['name'],
        },
        {
          include: {
            model: Item.schema(req.user.tenant),
            attributes: ['name'],
          },
          model: Invoiceitem.schema(req.user.tenant),
        },
        { model: Invoicepayment.schema(req.user.tenant) },
      ],
      limit: services.pp,
      offset: p ? services.pp * (parseInt(p, 10) - 1) : 0,
    })
    .then(({ count, rows }) => {
      res.render('invoices', {
        a: p,
        rp: Math.ceil(count / services.pp),
        invoices: JSON.parse(JSON.stringify(rows)).map((r) => {
          const value = r.invoiceitems.reduce(
            (prev, cur) => prev + cur.unitPrice * cur.quantity,
            0
          );

          return {
            ...r,
            statusLabel: services.getStatus(r.status),
            date: services.getDate(r.date),
            dueDate: services.getDate(r.dueDate),
            value: services.getPrice(value),
            dueValue: services.getPrice(
              value -
                r.invoicepayments.reduce((prev, cur) => prev + cur.value, 0)
            ),
          };
        }),
        redirecturl: 'invoices',
        title: 'Faturas',
        version: process.env.npm_package_version,
      });
    })
    .catch((e) => {
      res.status(400).json({ msg: e.message });
    });
});

router.get('/resources', ensureAuth, async (req, res) => {
  const customers = await Customer.schema(req.user.tenant).findAll({
    raw: true,
  });

  const products = await Item.schema(req.user.tenant).findAll({
    raw: true,
    where: {
      class: {
        [Op.ne]: 'PURCHASE',
      },
    },
  });

  const invoiceNumber = await Invoice.schema(req.user.tenant).max('id');

  res.json({
    customers,
    products,
    invoiceNumber: `${(invoiceNumber || 0) + 1}`.padStart(6, '0'),
  });
});

router.post('/add', ensureAuth, (req, res) => {
  const {
    customerId,
    number,
    order,
    date,
    paymentTerms,
    dueDate,
    invoiceitems,
    status,
  } = req.body;

  Invoice.schema(req.user.tenant)
    .create(
      {
        customerId,
        number,
        order,
        date,
        paymentTerms,
        dueDate,
        invoiceitems: invoiceitems.map((ev) => ({
          itemId: ev.itemId,
          quantity: ev.quantity,
          unitPrice: ev.unitPrice,
        })),
        status,
      },
      { include: [Invoice.schema(req.user.tenant).Invoiceitems] }
    )
    .then(() => {
      res.status(201).json({ msg: 'Fatura lançada.' });
    })
    .catch((e) => {
      res.status(400).json({ msg: e.message });
    });
});

router.post('/edit/:id', ensureAuth, (req, res) => {
  const {
    customerId,
    number,
    order,
    date,
    paymentTerms,
    dueDate,
    invoiceitems,
    status,
  } = req.body;

  const { id } = req.params;

  Invoiceitem.schema(req.user.tenant)
    .findAll({ where: { invoiceId: id } })
    .then(async (storedie) => {
      const tempobj = {};

      for (const invoiceitem of invoiceitems) {
        if (invoiceitem.id) {
          tempobj[invoiceitem.id] = invoiceitem;
        } else {
          await Invoiceitem.schema(req.user.tenant).create({
            itemId: invoiceitem.itemId,
            quantity: invoiceitem.quantity,
            unitPrice: invoiceitem.unitPrice,
            invoiceId: id,
          });
        }
      }

      for (const invoiceitem of storedie) {
        if (tempobj[invoiceitem.id]) {
          await invoiceitem.update({
            itemId: tempobj[invoiceitem.id].itemId,
            quantity: tempobj[invoiceitem.id].quantity,
            unitPrice: tempobj[invoiceitem.id].unitPrice,
          });
        } else {
          await Invoiceitem.schema(req.user.tenant).destroy({
            where: { id: invoiceitem.id },
          });
        }
      }
    });

  Invoice.schema(req.user.tenant)
    .findByPk(id)
    .then((item) => {
      item
        .update({
          customerId,
          number,
          order,
          date,
          paymentTerms,
          dueDate,
          status,
        })
        .then(() => {
          res.status(201).json({ msg: 'Fatura alterada.' });
        })
        .catch((err) => {
          res.status(400).json({ msg: err.message });
        });
    });
});

router.post('/delete', ensureAuth, (req, res) => {
  const id = JSON.parse(req.body.modaldeleteids);

  Invoiceitem.schema(req.user.tenant)
    .findAll({ where: { invoiceId: id } })
    .then(async (iis) => {
      for (const ii of iis) {
        await Invoiceitem.schema(req.user.tenant).destroy({
          where: { id: ii.id },
        });
      }
    });

  Invoice.schema(req.user.tenant)
    .destroy({ where: { id } })
    .then(() => {
      res.status(200).json({ msg: 'Faturas(s) cancelada(s).' });
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
});

module.exports = router;
