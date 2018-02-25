const rp = require('request-promise');
const Models = require('../../models');

module.exports = [
  {
    path: '/dislike',
    method: 'POST',
    handler: (request, response) => {
      const currentId = JSON.parse(request.payload);
      const tbookid = currentId.bookid;
      console.log('id::::', currentId.bookid, tbookid);
      Models.books.findOne({ where: { bookid: tbookid } }).then((value) => {
        if (value === null) {
          response('Invalid book ID');
        }
        Models.likes.update({ bookid: tbookid, status: 'notliked' }, { where: { bookid: tbookid } })
          .then((created) => {
            if (created === true) {
              response('Created');
            } else {
              response('notliked');
            }
          });
      });
    },
  },
];
