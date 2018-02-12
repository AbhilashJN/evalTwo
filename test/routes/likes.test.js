const Server = require('../../src/server');


describe('Testing response of server', () => {
  test('Testing response of server,should return Created', (done) => {
    const options = {
      method: 'POST',
      url: '/likes',
      payload: {
        bookid: 7,
      },
    };
    Server.inject(options, (result) => {
      expect(result.payload).toMatch('Stored');
      done();
    });
  });
  test('Testing response of server,should return Created', (done) => {
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
});

