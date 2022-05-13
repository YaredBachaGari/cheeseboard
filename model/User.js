const {sequelize, Sequelize } = require('../db')

const User = sequelize.define('user',{
    name:Sequelize.STRING,
    Email:Sequelize.STRING
});

module.exports = { User };