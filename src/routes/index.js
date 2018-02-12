const books = require('./books');
const likes = require('./likes');
const dislikes = require('./dislikes');

module.exports = [].concat(books)
  .concat(likes)
  .concat(dislikes);

