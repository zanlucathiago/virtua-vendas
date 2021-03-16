const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const Customer = require('../models/Customer');
const Invoice = require('../models/Invoice');
const Invoiceitem = require('../models/Invoiceitem');
const Invoicepayment = require('../models/Invoicepayment');
const Payment = require('../models/Payment');
const services = require('../services/services');

const pp = 10;

const router = express.Router();

router.get('/', ensureAuth, (req, res) => {
  const { p } = req.query;

  Payment.findAndCountAll({
    include: [
      {
        model: Customer,
        attributes: ['name'],
      },
      {
        include: {
          // attributes: ['number'],
          include: [{ model: Invoiceitem }, { model: Invoicepayment }],
          model: Invoice,
        },
        model: Invoicepayment,
      },
    ],
    limit: pp,
    offset: p ? pp * (parseInt(p, 10) - 1) : 0,
  })
    .then(({ count, rows }) => {
      // debugger;
      res.render('paymentsreceived', {
        a: p,
        rp: Math.ceil(count / pp),
        paymentsreceived: JSON.parse(JSON.stringify(rows)).map((pr) => ({
          ...pr,
          dueValue: services.getPrice(
            pr.value -
              pr.invoicepayments.reduce((prev, cur) => prev + cur.value, 0)
          ),
          invoicesLabel: pr.invoicepayments
            .map((ip) => ip.invoice.number)
            .join(','),
          modeLabel: services.getMode(pr.mode),
          valueLabel: services.getPrice(pr.value),
          invoicepayments: pr.invoicepayments.map((ip) => {
            // debugger;
            const i = ip.invoice;
            const value = i.invoiceitems.reduce(
              (prev, cur) => prev + cur.unitPrice * cur.quantity,
              0
            );

            const dueValue =
              value -
              i.invoicepayments.reduce((prev, cur) => prev + cur.value, 0);
            // debugger;
            return {
              ...ip,
              date: services.getDate(i.date),
              dueDate: services.getDate(i.dueDate),
              valueLabel: services.getPrice(value),
              dueValue,
              dueValueLabel: services.getPrice(dueValue),
              // invoicePaymentValue: dueValue,
            };
          }),
        })),
        redirecturl: 'paymentsreceived',
        title: 'Pagamentos',
      });
    })
    .catch((e) => {
      res.status(400).json({ msg: e.message });
    });
});

router.get('/resources', ensureAuth, async (req, res) => {
  Customer.findAll({ raw: true })
    .then((customers) => {
      res.json({ customers });
    })
    .catch((e) => {
      res.status(400).json({ msg: e.message });
    });
});

router.get('/resources/:customerId', ensureAuth, async (req, res) => {
  const { customerId } = req.params;

  Invoice.findAll({
    include: [{ model: Invoiceitem }, { model: Invoicepayment }],
    // raw: true,
    where: { customerId },
  })
    .then((invoices) => {
      // debugger;
      const inv = JSON.parse(JSON.stringify(invoices))
        .map((i) => {
          debugger;
          const value = i.invoiceitems.reduce(
            (prev, cur) => prev + cur.unitPrice * cur.quantity,
            0
          );

          const dueValue =
            value -
            i.invoicepayments.reduce((prev, cur) => prev + cur.value, 0);

          return {
            ...i,
            date: services.getDate(i.date),
            dueDate: services.getDate(i.dueDate),
            valueLabel: services.getPrice(value),
            dueValue,
            dueValueLabel: services.getPrice(dueValue),
            // invoicePaymentValue: dueValue,
          };
        })
        .filter((v) => v.dueValue);
      res.json({
        invoices: inv,
        value: inv.reduce((prev, cur) => prev + cur.dueValue, 0),
      });
    })
    .catch((e) => {
      res.status(400).json({ msg: e.message });
    });
});

router.post('/add', ensureAuth, (req, res) => {
  const {
    customerId,
    number,
    value,
    date,
    mode,
    reference,
    account,
    invoicepayments,
  } = req.body;

  Payment.create(
    {
      customerId,
      invoicepayments: invoicepayments.map((ip) => ({
        invoiceId: ip.invoiceId,
        value: ip.value,
      })),
      number,
      value,
      date,
      mode,
      reference,
      account,
    },
    { include: [Payment.Invoicepayments] }
  )
    .then(() => {
      res.status(201).json({ msg: 'Pagamento lançado.' });
    })
    .catch((e) => {
      res.status(400).json({ msg: e.message });
    });
});

router.post('/edit/:id', ensureAuth, (req, res) => {
  const {
    customerId,
    number,
    value,
    date,
    mode,
    reference,
    account,
    invoicepayments,
  } = req.body;

  const { id } = req.params;

  Invoicepayment.findAll({ where: { paymentId: id } }).then(
    async (storedip) => {
      const tempobj = {};

      for (const invoicepayment of invoicepayments.filter((ip) => ip.value)) {
        if (invoicepayment.id) {
          tempobj[invoicepayment.id] = invoicepayment;
        } else {
          await Invoiceitem.create({
            value: invoicepayment.value,
            invoiceId: id,
          });
        }
      }

      for (const invoicepayment of storedip) {
        if (tempobj[invoicepayment.id]) {
          await invoicepayment.update({
            value: tempobj[invoicepayment.id].value,
          });
        } else {
          await Invoiceitem.destroy({ where: { id: invoicepayment.id } });
        }
      }
    }
  );

  Payment.findByPk(id).then((item) => {
    item
      .update({
        customerId,
        number,
        value,
        date,
        mode,
        reference,
        account,
        invoicepayments,
      })
      .then(() => {
        res.status(201).json({ msg: 'Pagamento alterado.' });
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  });
});

router.post('/delete', ensureAuth, (req, res) => {
  const id = JSON.parse(req.body.modaldeleteids);

  Invoicepayment.findAll({ where: { paymentId: id } }).then(async (ips) => {
    for (const ip of ips) {
      await Invoicepayment.destroy({ where: { id: ip.id } });
    }
  });

  Payment.destroy({ where: { id } })
    .then(() => {
      res.status(200).json({ msg: 'Pagamento(s) cancelado(s).' });
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
});

module.exports = router;
