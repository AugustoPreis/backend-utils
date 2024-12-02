import { isString, isValidString } from '..';

describe('String validator', () => {
  it('String', () => {
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(10)).toBe(false);
    expect(isString(NaN)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);

    expect(isString('')).toBe(true);
    expect(isString('   ')).toBe(true);
    expect(isString('string value')).toBe(true);
    expect(isString('[]')).toBe(true);
    expect(isString('{}')).toBe(true);
  });

  it('String (valid)', () => {
    expect(isValidString(null)).toBe(false);
    expect(isValidString(undefined)).toBe(false);
    expect(isValidString(10)).toBe(false);
    expect(isValidString(NaN)).toBe(false);
    expect(isValidString({})).toBe(false);
    expect(isValidString([])).toBe(false);

    expect(isValidString('')).toBe(false);
    expect(isValidString('  ')).toBe(false);
    expect(isValidString('str')).toBe(true);
    expect(isValidString(' str ')).toBe(true);

    expect(isValidString('str', { minLength: 4 })).toBe(false);
    expect(isValidString('', { minLength: 0 })).toBe(true);
    expect(isValidString(' ', { minLength: 1 })).toBe(true);
    expect(isValidString(' str ', { minLength: 5 })).toBe(true);

    expect(isValidString('str', { maxLength: 0 })).toBe(false);
    expect(isValidString(' ', { maxLength: 0 })).toBe(false);
    expect(isValidString(' str ', { maxLength: 3 })).toBe(false);
    expect(isValidString('', { maxLength: 0 })).toBe(true);
    expect(isValidString(' str ', { maxLength: 5 })).toBe(true);

    expect(isValidString('', { contains: ' ' })).toBe(false);
    expect(isValidString('tes', { contains: 'test' })).toBe(false);
    expect(isValidString('test', { contains: ['tested'] })).toBe(false);
    expect(isValidString('tested value', { contains: ['tested value1'] })).toBe(false);
    expect(isValidString('tested value', { contains: [' tested value '] })).toBe(false);
    expect(isValidString('', { contains: '' })).toBe(true);
    expect(isValidString('test', { contains: 'test' })).toBe(true);
    expect(isValidString('tested value', { contains: 'test' })).toBe(true);
    expect(isValidString('tested value', { contains: ['tested'] })).toBe(true);
    expect(isValidString('tested value', { contains: ['value'] })).toBe(true);
    expect(isValidString('tested value', { contains: ['tested', 'value'] })).toBe(true);
    expect(isValidString('tested value', { contains: ['te', 'sted', 'va', 'lue'] })).toBe(true);

    const onlyNumbers = /^[0-9]+$/;
    const onlyLetters = /^[a-zA-Z]+$/;

    expect(isValidString('', { pattern: onlyNumbers })).toBe(false);
    expect(isValidString('  ', { pattern: onlyNumbers })).toBe(false);
    expect(isValidString('str', { pattern: onlyNumbers })).toBe(false);
    expect(isValidString('str123', { pattern: onlyNumbers })).toBe(false);
    expect(isValidString('123', { pattern: onlyLetters })).toBe(false);
    expect(isValidString('str123', { pattern: onlyLetters })).toBe(false);
    expect(isValidString('10', { pattern: onlyNumbers })).toBe(true);
    expect(isValidString('123', { pattern: onlyNumbers })).toBe(true);
    expect(isValidString('str', { pattern: onlyLetters })).toBe(true);

    expect(isValidString('', { trimToValidate: true })).toBe(true);
    expect(isValidString(' ', { trimToValidate: true })).toBe(true);
    expect(isValidString(' str ', { trimToValidate: true })).toBe(true);
  });
});