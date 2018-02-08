module.exports = [
  {
    path: '/books',
    method: 'GET',
    handler: (request, response) => {
      response('hello');
    },
  },
];

