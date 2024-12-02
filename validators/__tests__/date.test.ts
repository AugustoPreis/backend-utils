import { isDate, isValidDate } from '..';

describe('Date validator', () => {
  it('Date', () => {
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate('')).toBe(false);
    expect(isDate('2000-01-01')).toBe(false);
    expect(isDate(Object)).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate([])).toBe(false);

    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date(2000, 1, 1))).toBe(true);
    expect(isDate(new Date('invalid'))).toBe(true); //Invalid Date
  });

  it('Date (valid)', () => {
    const now = new Date();
    const oldSecond = new Date(now.getTime() - 1000);
    const nextSecond = new Date(now.getTime() + 1000);

    expect(isValidDate(null)).toBe(false);
    expect(isValidDate(undefined)).toBe(false);
    expect(isValidDate('')).toBe(false);
    expect(isValidDate('2000-01-01')).toBe(false);
    expect(isValidDate(Object)).toBe(false);
    expect(isValidDate({})).toBe(false);
    expect(isValidDate([])).toBe(false);

    expect(isValidDate(new Date('invalid'))).toBe(false); //Invalid Date

    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date(2000, 1, 1))).toBe(true);

    expect(isValidDate(now, { min: nextSecond })).toBe(false);
    expect(isValidDate(now, { min: nextSecond.getTime() })).toBe(false);
    expect(isValidDate(now, { min: now })).toBe(true);
    expect(isValidDate(now, { min: now.getTime() })).toBe(true);
    expect(isValidDate(now, { min: oldSecond })).toBe(true);
    expect(isValidDate(now, { min: oldSecond.getTime() })).toBe(true);

    expect(isValidDate(now, { max: oldSecond })).toBe(false);
    expect(isValidDate(now, { max: oldSecond.getTime() })).toBe(false);
    expect(isValidDate(now, { max: now })).toBe(true);
    expect(isValidDate(now, { max: now.getTime() })).toBe(true);
    expect(isValidDate(now, { max: nextSecond })).toBe(true);
    expect(isValidDate(now, { max: nextSecond.getTime() })).toBe(true);
  });
});