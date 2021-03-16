const { Sequelize } = require('sequelize');

// module.exports = new Sequelize(process.env.DATABASE_URL);

// module.exports = new Sequelize('books', 'thiago', 'Mkbm@@1401', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// module.exports = new Sequelize(
//   'd79nt3iipo02ia',
//   'nfqbfjxlwfwbxb',
//   '3f610c070681362e1b7d5f6e596de0c55dd71be6b568dc7295a4db308a89c5b1',
//   {
//     dialect: 'postgres',
//     host: 'ec2-54-145-102-149.compute-1.amazonaws.com',
//     port: 5432,
//   }
// );

module.exports = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    port: process.env.PORT,
  }
);
