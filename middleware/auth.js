const jwt = require('jsonwebtoken');

const isAuthenticated = (req) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return false;
    }

    const user = jwt.verify(
      token,
      process.env.JWT_SECRET || 'ba945695-f486-44f4-a79a-cb03c7f4ecba'
    );

    req.user = user;
    // req.tenant = user;
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  ensureAuth: function (req, res, next) {
    if (isAuthenticated(req)) {
      return next();
    }

    res.redirect('/');
  },
  ensureGuest: function (req, res, next) {
    if (!isAuthenticated(req)) {
      return next();
    }
    res.redirect('/invoices');
  },
};
