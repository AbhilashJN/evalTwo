'use strict';
module.exports = (sequelize, DataTypes) => {
  var books = sequelize.define('books', {
    bookid: DataTypes.INTEGER,
    author: DataTypes.STRING,
    name: DataTypes.STRING,
    rating: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return books;
};