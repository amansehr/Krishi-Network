const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL,{
  //  host: dbConfig.HOST,
    dialect : dbConfig.dialect,
    dialectOptions : dbConfig.dialectOptions
})

const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('../models/user.model')(sequelize,Sequelize);
db.addTweet = require('../models/Tweet.model')(sequelize,Sequelize);

module.exports = db;
require("dotenv").config();

// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });