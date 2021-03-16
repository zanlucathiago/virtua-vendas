const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const db = require('./config/database');

// support parsing of application/json type post data
db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Error: ${err}`));

db.sync({ alter: true }).then(() => {
  // db.sync({ force: true }).then(() => {
  console.log('All models were synchronized successfully.');
});

const app = express();

const { invoiceitemrows, iterator, times } = require('./helpers/hbs');

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: {
      invoiceitemrows,
      iterator,
      times,
    },
  })
);

app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Routes
app.use('/contacts', require('./routes/contacts'));
app.use('/invoices', require('./routes/invoices'));
app.use('/paymentsreceived', require('./routes/paymentsreceived'));
app.use('/inventory', require('./routes/inventory'));
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
