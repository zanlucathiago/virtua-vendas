const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');

const db = require('./config/database');

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Error: ${err}`));

db.sync({ alter: true }).then(() => {
  // db.sync({ force: true }).then(() => {
  console.log('All models were synchronized successfully.');
});

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Routes
app.use('/contacts', require('./routes/contacts'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/invoices', require('./routes/invoices'));
app.use('/inventory', require('./routes/inventory'));
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
