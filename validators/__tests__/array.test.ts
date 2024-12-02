import { isArray, isValidArray } from '..';

describe('Array validator', () => {
  it('Array', () => {
    expect(isArray(null)).toBe(false);
    expect(isArray('')).toBe(false);
    expect(isArray('[]')).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray({ key: [] })).toBe(false);

    expect(isArray([])).toBe(true);
    expect(isArray([{}])).toBe(true);
    expect(isArray([[]])).toBe(true);
    expect(isArray(['str'])).toBe(true);
    expect(isArray([10])).toBe(true);
    expect(isArray([[], {}, 10, 'str'])).toBe(true);
  });

  it('Array (valid)', () => {
    expect(isValidArray(null)).toBe(false);
    expect(isValidArray('')).toBe(false);
    expect(isValidArray('[]')).toBe(false);
    expect(isValidArray({})).toBe(false);
    expect(isValidArray({ key: [] })).toBe(false);
    expect(isValidArray([])).toBe(false);

    expect(isValidArray([{}])).toBe(true);
    expect(isValidArray([[]])).toBe(true);
    expect(isValidArray(['str'])).toBe(true);
    expect(isValidArray([10])).toBe(true);
    expect(isValidArray([[], {}, 10, 'str'])).toBe(true);

    expect(isValidArray([{}], { minLength: 2 })).toBe(false);
    expect(isValidArray([{}, {}], { minLength: 2 })).toBe(true);
    expect(isValidArray([null, null, undefined, ''], { minLength: 4 })).toBe(true);
    expect(isValidArray([], { minLength: 0 })).toBe(true);

    expect(isValidArray([], { maxLength: 3 })).toBe(true);
    expect(isValidArray([1], { maxLength: 3 })).toBe(true);
    expect(isValidArray([1, 2], { maxLength: 3 })).toBe(true);
    expect(isValidArray([1, 2, 3], { maxLength: 3 })).toBe(true);
    expect(isValidArray([1, 2, 3, 4], { maxLength: 3 })).toBe(false);
    expect(isValidArray([null, null, null, null], { maxLength: 3 })).toBe(false);
  });
});