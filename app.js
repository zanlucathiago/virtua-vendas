const express = require('express');
const exphbs = require('express-handlebars');
// const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Error: ${err}`));

// Item.hasOne(Banking);

db.sync({ alter: true }).then(() => {
  // db.sync({ force: true }).then(() => {
  console.log('All models were synchronized successfully.');
});

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => res.render('index', { layout: 'landing' }));
app.get('/', (req, res) => res.render('index'));

// Routes
app.use('/contacts', require('./routes/contacts'));
app.use('/invoices', require('./routes/invoices'));
app.use('/inventory', require('./routes/inventory'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
