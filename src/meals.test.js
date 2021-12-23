// import mock from './__mocks__/meal'
import { fetchMeals } from './meals.js';

jest.mock('./meals.js');

test('dataLength', () => {
  fetchMeals().then((data) => {
    expect(data.meals).toHaveLength(3);
  });
});