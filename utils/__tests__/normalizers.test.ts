import { string, number, boolean, id } from '..';

describe('Normalizers', () => {
  it('String', () => {
    expect(string(null)).toBe(null);
    expect(string(undefined)).toBe(null);
    expect(string([])).toBe(null);
    expect(string({})).toBe(null);

    expect(string(NaN)).toBe('NaN');
    expect(string(0)).toBe('0');
    expect(string(10)).toBe('10');
    expect(string(10.5)).toBe('10.5');

    expect(string('')).toBe('');
    expect(string(' ')).toBe(' ');
    expect(string('test')).toBe('test');
    expect(string(' space ')).toBe(' space ');
    expect(string(' ', {})).toBe(' ');

    expect(string('', { trim: true })).toBe('');
    expect(string('  ', { trim: true })).toBe('');
    expect(string(' space_before', { trim: true })).toBe('space_before');
    expect(string('space_after ', { trim: true })).toBe('space_after');
    expect(string(' space ', { trim: true })).toBe('space');
  });

  it('Number', () => {
    expect(number(null)).toBe(null);
    expect(number(undefined)).toBe(null);
    expect(number([])).toBe(null);
    expect(number({})).toBe(null);
    expect(number('not_number')).toBe(null);
    expect(number('NaN')).toBe(null);
    expect(number('')).toBe(null);

    expect(number('0')).toBe(0);
    expect(number('10')).toBe(10);
    expect(number('10.5')).toBe(10.5);

    expect(number(0)).toBe(0);
    expect(number(10)).toBe(10);
    expect(number(10.5)).toBe(10.5);

    expect(number(0, { min: 2 })).toBe(2);
    expect(number(5, { min: 2 })).toBe(5);
    expect(number(5, { min: 5 })).toBe(5);

    expect(number(5, { max: 2 })).toBe(2);
    expect(number(0, { max: 2 })).toBe(0);
    expect(number(5, { max: 5 })).toBe(5);

    expect(number(0, { integer: true })).toBe(0);
    expect(number(10.4, { integer: true })).toBe(10);
    expect(number(10.5, { integer: true })).toBe(11);
  });

  it('Boolean', () => {
    expect(boolean(null)).toBe(false);
    expect(boolean(undefined)).toBe(false);
    expect(boolean(0)).toBe(false);
    expect(boolean(NaN)).toBe(false);
    expect(boolean('')).toBe(false);
    expect(boolean(' ')).toBe(false);
    expect(boolean('false')).toBe(false);

    expect(boolean({})).toBe(true);
    expect(boolean(10)).toBe(true);
    expect(boolean(true)).toBe(true);
    expect(boolean('true')).toBe(true);
  });

  it('ID', () => {
    expect(id(null)).toBe(null);
    expect(id('')).toBe(null);
    expect(id('NaN')).toBe(null);
    expect(id('str')).toBe(null);

    expect(id(0)).toBe(1);
    expect(id(10.4)).toBe(10);
    expect(id(10.5)).toBe(11);
  });
})