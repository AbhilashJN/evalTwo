const rp = require('request-promise');
const Models = require('../../models');

module.exports = [
  {
    path: '/dislikes',
    method: 'POST',
    handler: (request, response) => {
      const currentId = request.payload.bookid;
      Models.likes.upsert({ id: currentId, bookid: currentId, status: 'disliked' })
        .then((created) => {
          if (created === true) {
            response('Created');
          } else {
            response('Stored');
          }
        });
    },
  },
];
