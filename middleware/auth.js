const jwt = require('jsonwebtoken');
// const config = require('../config');

// const { JWT_SECRET } = config;
const JWT_SECRET = 'bd8a9806-8ea2-4409-b601-5d7e7a66273c';

const isAuthenticated = (req) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return false;
    }

    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    return true;
    // next();
  } catch (err) {
    return false;
  }
  // const token = req.header('x-auth-token');

  // // Check for token
  // if (!token) {
  //   return false;
  // }

  // // return res.status(401).json({ msg: 'No token, authorization denied' });

  // try {
  //   // Verify token
  //   jwt.verify(token, JWT_SECRET);
  //   // Add user from payload
  //   // req.user = decoded;
  //   return true;
  // } catch (e) {
  //   return false;
  // }
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
    res.redirect('/dashboard');
  },
};
