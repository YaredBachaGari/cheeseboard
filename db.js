// require package and intialize the the connection 

const {Sequelize, Model} = require('sequelize');
const path =  require('path')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage:path.join(__dirname,'db.sqlite')
})

module.exports = {
    sequelize,
    Sequelize,
    Model
};