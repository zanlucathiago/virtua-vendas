const express = require('express');
const { ensureGuest } = require('../middleware/auth');

const router = express.Router();

router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

module.exports = router;
