const express = require('express');
const { ensureAuth } = require('../middleware/auth');
// const Item = require('../models/Item');

const router = express.Router();

router.get('/', ensureAuth, (req, res) => res.render('dashboard'));

module.exports = router;
