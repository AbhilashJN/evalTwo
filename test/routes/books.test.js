const Server = require('../../src/server');


describe('Testing response of server', () => {
  test('Testing response of server,should return the grouped books obj', (done) => {
    const options = {
      method: 'GET',
      url: '/books',

    };
    Server.inject(options, (response) => {
      const expectedObj = {
        'J K Rowling':
      [{
        Author: 'J K Rowling',
        id: 1,
        Name: 'Harry Potter and the Sorcerers Stone (Harry Potter, #1)',
        rating: 4.45,
      },
      {
        Author: 'J K Rowling',
        id: 2,
        Name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
        rating: 4.38,
      },
      {
        Author: 'J K Rowling',
        id: 3,
        Name: 'Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)',
        rating: 4.54,
      },
      {
        Author: 'J K Rowling',
        id: 4,
        Name: 'Harry Potter and the Goblet of Fire (Harry Potter, #4)',
        rating: 4.53,
      },
      {
        Author: 'J K Rowling',
        id: 5,
        Name: 'Harry Potter and the Order of the Phoenix (Harry Potter, #5)',
        rating: 4.47,
      },
      {
        Author: 'J K Rowling',
        id: 6,
        Name: 'Harry Potter and the Half-Blood Prince (Harry Potter, #6)',
        rating: 4.54,
      },
      {
        Author: 'J K Rowling',
        id: 7,
        Name: 'Harry Potter and the Deathly Hallows (Harry Potter, #7)',
        rating: 4.62,
      }],
        'Sidney Sheldon':
      [{
        Author: 'Sidney Sheldon',
        id: 8,
        Name: 'If Tomorrow Comes (Tracy Whitney Series, #1)',
        rating: 4.02,
      },
      {
        Author: 'Sidney Sheldon',
        id: 10,
        Name: 'Tell Me Your Dreams',
        rating: 3.93,
      },
      {
        Author: 'Sidney Sheldon',
        id: 9,
        Name: 'Master of the Game',
        rating: 4.1,
      },
      {
        Author: 'Sidney Sheldon',
        id: 11,
        Name: 'The Other Side of Midnight (Midnight #1)',
        rating: 3.9,
      },
      {
        Author: 'Sidney Sheldon',
        id: 12,
        Name: 'Rage of Angels',
        rating: 3.92,
      }],
      };
      expect(response.result).toEqual(expectedObj);
      done();
    });
  });
  test('Testing response of server,should return hello', (done) => {
    const options = {
      method: 'POST',
      url: '/books',
    };
    Server.inject(options, (response) => {
      expect(response.result).not.toEqual([]);
      done();
    });
  });
});

