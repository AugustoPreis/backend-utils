import { isArray, isValidNumber } from '.';

export interface StringValidatorConfig {
  minLength: number;
  maxLength: number;
  contains: string | string[];
  pattern: RegExp | string;
  trimToValidate: boolean;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isValidString(value: unknown, config?: Partial<StringValidatorConfig>): value is string {
  if (!isString(value)) {
    return false;
  }

  if (!config) {
    return value.trim() != '';
  }

  const { minLength, maxLength, contains, pattern, trimToValidate } = config;
  let str: string = value;

  if (trimToValidate) {
    str = str.trim();
  }

  if (isValidNumber(minLength) && str.length < minLength) {
    return false;
  }

  if (isValidNumber(maxLength) && str.length > maxLength) {
    return false;
  }

  if (isString(contains) && !str.includes(contains)) {
    return false;
  }

  if (isArray(contains) && !contains.every((sub) => str.includes(sub))) {
    return false;
  }

  if ((pattern instanceof RegExp || isString(pattern)) && !(new RegExp(pattern).test(str))) {
    return false;
  }

  return true;
}