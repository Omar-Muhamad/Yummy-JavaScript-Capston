import { addCommentCount } from './commentsPopup.js';

jest.mock('./commentsPopup.js');

describe('Comments count function', () => {
  test('Comments count should be', () => {
    expect(addCommentCount([
      { creation_date: '2021-12-24', username: 'Omar', comment: 'so good' },
      { comment: 'Yummy', username: 'Shady ', creation_date: '2021-12-24' },
    ])).toBe(2);
  });

  test('Comments count of empty Comments array to be 0', () => {
    expect(addCommentCount([])).toBe(0);
  });
});