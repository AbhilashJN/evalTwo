const rp = require('request-promise');
const Models = require('../../models');

const makeRequest = url => rp(url);
const getRatingsPromisesArray = (allBooksArray) => {
  const secondApiUrl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/';

  const ratingsPromisesArray = [];
  allBooksArray.map((book) => {
    const bookId = book.id;
    const getRatingsPromise = makeRequest(secondApiUrl + bookId);
    ratingsPromisesArray.push(getRatingsPromise);
  });
  return ratingsPromisesArray;
};

const mergeRatingsWithBooks = (allBooksArray, ratingsArray) => {
  const booksWithRatings = allBooksArray.map((book, index) => {
    const newBook = { ...book };
    newBook.rating = JSON.parse(ratingsArray[index]).rating;
    return newBook;
  });
  return booksWithRatings;
};

const groupByAuthor = (booksWithRatings) => {
  console.log(booksWithRatings);
  const booksGroupedByAuthor = booksWithRatings.reduce((acc, current) => {
    acc[current.Author] = acc[current.Author] || [];
    acc[current.Author].push(current);
    return acc;
  }, {});
  return booksGroupedByAuthor;
};


const getBooksWithRatings = () => {
  const firstApiUrl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';
  const getBooksObjectPromise = makeRequest(firstApiUrl);
  const getAllRatingsPromise = getBooksObjectPromise.then((allBooksObject) => {
    const allBooksArray = JSON.parse(allBooksObject).books;
    const ratingsPromisesArray = getRatingsPromisesArray(allBooksArray);
    const getBooksWithRatingsPromise = Promise.all(ratingsPromisesArray).then((ratingsArray) => {
      const booksWithRatings = mergeRatingsWithBooks(allBooksArray, ratingsArray);
      return booksWithRatings;
    });
    return getBooksWithRatingsPromise;
  });
  return getAllRatingsPromise;
};

module.exports = [
  {
    path: '/books',
    method: 'GET',
    handler: (request, response) => {
      const booksWithRatings = getBooksWithRatings();
      const booksGroupedByAuthor = groupByAuthor(booksWithRatings);
      response(booksGroupedByAuthor);
    },
  },

  {
    path: '/books',
    method: 'POST',
    handler: (request, response) => {
      const booksWithRatings = getBooksWithRatings();
      booksWithRatings.then((booksWithRatingsArray) => {
        const modifiedArray = [];
        booksWithRatingsArray.forEach((book) => {
          const modifiedObj = {};
          modifiedObj.bookid = book.id;
          modifiedObj.author = book.Author;
          modifiedObj.name = book.Name;
          modifiedObj.rating = book.rating;
          modifiedArray.push(modifiedObj);
        });
        Models.books.destroy({ truncate: true, restartIdentity: true });
        Models.books.bulkCreate(modifiedArray).then(response);
      });
    },
  },

  {
    path: '/getbooks',
    method: 'GET',
    handler: (request, response) => {
      const booksWithRatings = Models.books.findAndCountAll({ attributes: [['bookid', 'id'], 'rating', ['name', 'Name'], ['author', 'Author']] });

      booksWithRatings.then(value => (value.rows)).then((rows) => {
        const dbBooksArray = rows.map(book =>
          // console.log(book.dataValues);
          book.dataValues);
        const grouped = groupByAuthor(dbBooksArray);
        console.log('grouped:', grouped);
        response(grouped);
      });
    },
  },
];

