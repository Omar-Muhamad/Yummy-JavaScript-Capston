import { addCommentCount } from './commentsPopup.js';
jest.mock('./commentsPopup.js');

test('Comment Count', () => {
  expect(addCommentCount([1, 2, 3])).toBe(3);
});
