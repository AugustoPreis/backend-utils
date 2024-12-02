import { isObject, isValidObject } from '..';

describe('Array validator', () => {
  it('Object', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject(String)).toBe(false);
    expect(isObject('String')).toBe(false);
    expect(isObject(10)).toBe(false);

    expect(isObject({})).toBe(true);
    expect(isObject({ prop: [] })).toBe(true);
  });

  it('Object (valid)', () => {
    expect(isValidObject(null)).toBe(false);
    expect(isValidObject(undefined)).toBe(false);
    expect(isValidObject([])).toBe(false);
    expect(isValidObject(String)).toBe(false);
    expect(isValidObject('String')).toBe(false);
    expect(isValidObject(10)).toBe(false);
    expect(isValidObject({})).toBe(false);

    expect(isValidObject({ prop: [] })).toBe(true);

    expect(isValidObject({}, { minProperties: 1 })).toBe(false);
    expect(isValidObject({}, { minProperties: 0 })).toBe(true);
    expect(isValidObject({ prop: 'value' }, { minProperties: 0 })).toBe(true);
    expect(isValidObject({ prop1: 'value' }, { minProperties: 1 })).toBe(true);
    expect(isValidObject({ prop1: 'value', prop2: 10 }, { minProperties: 1 })).toBe(true);

    expect(isValidObject({ prop: 'value' }, { maxProperties: 0 })).toBe(false);
    expect(isValidObject({ prop1: 'value', prop2: 10 }, { maxProperties: 1 })).toBe(false);
    expect(isValidObject({}, { maxProperties: 0 })).toBe(true);
    expect(isValidObject({}, { maxProperties: 1 })).toBe(true);
    expect(isValidObject({ prop1: 'value' }, { maxProperties: 1 })).toBe(true);
    expect(isValidObject({ prop1: 'value', prop2: 10 }, { maxProperties: 2 })).toBe(true);
    expect(isValidObject({ prop1: 'value', prop2: 10 }, { maxProperties: 3 })).toBe(true);

  });
});