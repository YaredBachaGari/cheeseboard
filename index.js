//import models 
const {Board} = require('./model/Board');
const {Cheese} = require('./model/Cheese');
const {User} = require('./model/User');

//Association or Relationship 
User.hasMany(Board);
Board.belongsTo(User);
Board.belongsToMany(Cheese,{through:'cheese-board'});
Cheese.belongsToMany(Board,{through:'cheese-board'});

module.exports = {Board, Cheese, User}