import { isNumber, isValidNumber } from '..';

describe('Array validator', () => {
  it('Number', () => {
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber('')).toBe(false);
    expect(isNumber('10')).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber({})).toBe(false);

    expect(isNumber(0)).toBe(true);
    expect(isNumber(10)).toBe(true);
    expect(isNumber(1.1)).toBe(true);
    expect(isNumber(NaN)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
  });

  it('Number (valid)', () => {
    expect(isValidNumber(null)).toBe(false);
    expect(isValidNumber(undefined)).toBe(false);
    expect(isValidNumber('')).toBe(false);
    expect(isValidNumber('10')).toBe(false);
    expect(isValidNumber([])).toBe(false);
    expect(isValidNumber({})).toBe(false);

    expect(isValidNumber(NaN)).toBe(false);
    expect(isValidNumber(Infinity)).toBe(false);

    expect(isValidNumber(0)).toBe(true);
    expect(isValidNumber(10)).toBe(true);
    expect(isValidNumber(1.1)).toBe(true);

    expect(isValidNumber(-2, { min: -1 })).toBe(false);
    expect(isValidNumber(0, { min: 5 })).toBe(false);
    expect(isValidNumber(2, { min: 5 })).toBe(false);
    expect(isValidNumber(0, { min: -1 })).toBe(true);
    expect(isValidNumber(5, { min: 5 })).toBe(true);
    expect(isValidNumber(10, { min: 5 })).toBe(true);
    expect(isValidNumber(4.5, { min: 4.5 })).toBe(true);

    expect(isValidNumber(0, { max: -1 })).toBe(false);
    expect(isValidNumber(10, { max: 5 })).toBe(false);
    expect(isValidNumber(3, { max: 3 })).toBe(true);
    expect(isValidNumber(5, { max: 5 })).toBe(true);
    expect(isValidNumber(-3, { max: -2 })).toBe(true);
    expect(isValidNumber(4.5, { max: 4.5 })).toBe(true);

    expect(isValidNumber(0, { minDecimalPlaces: 2 })).toBe(false);
    expect(isValidNumber(0, { minDecimalPlaces: 1 })).toBe(false);
    expect(isValidNumber(0, { minDecimalPlaces: 0 })).toBe(true);
    expect(isValidNumber(0.12, { minDecimalPlaces: 2 })).toBe(true);
    expect(isValidNumber(0.123, { minDecimalPlaces: 2 })).toBe(true);
    expect(isValidNumber(0.00001, { minDecimalPlaces: 5 })).toBe(true);
    expect(isValidNumber(0.000012, { minDecimalPlaces: 5 })).toBe(true);

    expect(isValidNumber(0, { maxDecimalPlaces: 2 })).toBe(true);
    expect(isValidNumber(0, { maxDecimalPlaces: 1 })).toBe(true);
    expect(isValidNumber(0, { maxDecimalPlaces: 0 })).toBe(true);
    expect(isValidNumber(0.12, { maxDecimalPlaces: 2 })).toBe(true);
    expect(isValidNumber(0.123, { maxDecimalPlaces: 2 })).toBe(false);
    expect(isValidNumber(0.00001, { maxDecimalPlaces: 5 })).toBe(true);
    expect(isValidNumber(0.000012, { maxDecimalPlaces: 5 })).toBe(false);

    expect(isValidNumber(0.12, { integer: true })).toBe(false);
    expect(isValidNumber(0.1, { integer: true })).toBe(false);
    expect(isValidNumber(10.10, { integer: true })).toBe(false);
    expect(isValidNumber(0, { integer: true })).toBe(true);
    expect(isValidNumber(10, { integer: true })).toBe(true);
    expect(isValidNumber(12, { integer: true })).toBe(true);
    expect(isValidNumber(15, { integer: true })).toBe(true);
    expect(isValidNumber(1000, { integer: true })).toBe(true);

    expect(isValidNumber(0, { float: true })).toBe(false);
    expect(isValidNumber(15, { float: true })).toBe(false);
    expect(isValidNumber(1000, { float: true })).toBe(false);
    expect(isValidNumber(0.1, { float: true })).toBe(true);
    expect(isValidNumber(15.12, { float: true })).toBe(true);
    expect(isValidNumber(10.2122, { float: true })).toBe(true);
    expect(isValidNumber(1000.0001, { float: true })).toBe(true);
  });
});