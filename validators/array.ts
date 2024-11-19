import { isValidNumber } from '.';

export interface ArrayValidatorConfig {
  minLength: number;
  maxLength: number;
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

export function isValidArray(value: unknown, config?: Partial<ArrayValidatorConfig>): value is unknown[] {
  if (!isArray(value)) {
    return false;
  }

  if (!config) {
    return value.length > 0;
  }

  const { minLength, maxLength } = config;

  if (isValidNumber(minLength) && value.length < minLength) {
    return false;
  }

  if (isValidNumber(maxLength) && value.length > maxLength) {
    return false;
  }

  return true;
}