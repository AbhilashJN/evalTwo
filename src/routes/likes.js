const rp = require('request-promise');
const Models = require('../../models');

module.exports = [
  {
    path: '/like',
    method: 'POST',
    handler: (request, response) => {
      const currentId = JSON.parse(request.payload);
      const tbookid = currentId.bookid;
      console.log('id::::', currentId.bookid, tbookid);
      Models.books.findOne({ where: { bookid: tbookid } }).then((value) => {
        if (value === null) {
          response('Invalid book ID');
        }
        Models.likes.update({ bookid: tbookid, status: 'liked' }, { where: { bookid: tbookid }, returning: true })
          .then((updated) => {
            if (updated[0] > 0) {
              response(updated[1][0].status);
            } else {
              Models.likes.create({ bookid: tbookid, status: 'liked' }, { returning: true })
                .then((created) => { response(created.status); });
            }
          });
      });
    },
  },
];
