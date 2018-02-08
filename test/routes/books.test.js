const Server = require('../../src/server');


describe('Testing response of server', () => {
  test('Testing response of server,should return hello', (done) => {
    const options = {
      method: 'GET',
      url: '/books',

    };
    Server.inject(options, (result) => {
      expect(result.payload).toMatch('hello');
      done();
    });
  });
});

