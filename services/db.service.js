const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect : dbConfig.dialect,
    dialectOptions : dbConfig.dialectOptions
})

const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('../models/user.model')(sequelize,Sequelize);
db.addTweet = require('../models/Tweet.model')(sequelize,Sequelize);

module.exports = db;

