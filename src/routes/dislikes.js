const rp = require('request-promise');
const Models = require('../../models');

module.exports = [
  {
    path: '/dislikes',
    method: 'POST',
    handler: (request, response) => {
      const currentId = request.payload.bookid;
      Models.books.findOne({ where: { bookid: currentId } }).then((value) => {
        if (value === null) {
          response('Invalid book ID');
        }
        Models.likes.upsert({ id: currentId, bookid: currentId, status: 'disliked' })
          .then((created) => {
            if (created === true) {
              response('Created');
            } else {
              response('Stored');
            }
          });
      });
    },
  },
];
