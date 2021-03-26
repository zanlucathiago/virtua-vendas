const express = require('express');
const { ensureGuest, ensureAuth } = require('../middleware/auth');
const db = require('../config/database');

const router = express.Router();

router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    abc: 123,
    formAction: process.env.AUTH_HOST || 'http://localhost:5001/api/auth/login',
    layout: 'login',
  });
});

router.get('/sync/:action/:tenant', ensureAuth, async (req, res) => {
  const { action } = req.params;

  const {
    customer,
    invoice,
    invoiceitem,
    invoicepayment,
    item,
    payment,
  } = db.models;

  const models = [
    customer,
    item,
    invoice,
    invoiceitem,
    payment,
    invoicepayment,
  ];

  for (const model of models) {
    await model
      .schema(req.params.tenant)
      .sync(action ? { [action]: true } : {});
  }

  res.status(200).send();
});

module.exports = router;
