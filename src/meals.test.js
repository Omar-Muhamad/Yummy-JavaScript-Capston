import { fetchMeals, displayDataLength } from './meals.js';

jest.mock('./meals.js');

describe('Items Counter', () => {
  test('dataLength 2', () => {
    fetchMeals().then((data) => {
      expect(data.meals).toHaveLength(3);
    });
  });
});

describe('Display Data Length', () => {
  test('displayDataLength 1', () => {
    expect(displayDataLength(3, 'Beef')).toBe('3 Beef recipes');
  });
  test('displayDataLength 2', () => {
    expect(displayDataLength(5, 'SeaFood')).toBe('5 SeaFood recipes');
  });
});