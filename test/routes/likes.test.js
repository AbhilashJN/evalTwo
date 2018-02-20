const Server = require('../../src/server');
const Models = require('../../models');

describe('Testing response of server', () => {
  beforeAll((done) => {
    Models.likes.destroy({ truncate: true }).then(() => {
      Models.likes.create({ bookid: 4, status: 'disliked' }).then(() => { done(); });
    });
  });
  afterAll((done) => {
    Models.likes.destroy({ truncate: true }).then(() => { done(); });
  });
  test('Testing for new book,should return Created', (done) => {
    const options = {
      method: 'POST',
      url: '/likes',
      payload: {
        bookid: 7,
      },
    };
    Server.inject(options, (result) => {
      expect(result.payload).toMatch('Created');
      done();
    });
  });
  test('Testing previously disliked book,should return Stored', (done) => {
    const options = {
      method: 'POST',
      url: '/likes',
      payload: {
        bookid: 4,
      },
    };
    Server.inject(options, (result) => {
      expect(result.payload).toMatch('Stored');
      done();
    });
  });
  test('Testing invalid book id,should return Invalid book ID', (done) => {
    const options = {
      method: 'POST',
      url: '/likes',
      payload: {
        bookid: 666,
      },
    };
    Server.inject(options, (result) => {
      expect(result.payload).toMatch('Invalid book ID');
      done();
    });
  });
});

