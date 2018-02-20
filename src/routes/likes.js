const rp = require('request-promise');
const Models = require('../../models');

module.exports = [
  {
    path: '/likes',
    method: 'POST',
    handler: (request, response) => {
      const currentId = request.payload.bookid;
      Models.books.findOne({ where: { bookid: currentId } }).then((value) => {
        if (value === null) {
          response('Invalid book ID');
        }
        Models.likes.upsert({ id: currentId, bookid: currentId, status: 'liked' })
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
