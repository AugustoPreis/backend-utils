import { isValidNumber } from '.';

export interface ObjectValidatorConfig {
  minProperties?: number;
  maxProperties?: number;
}

export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value?.toString?.() === '[object Object]';
}

export function isValidObject(value: unknown, config?: Partial<ObjectValidatorConfig>): value is object {
  if (!isObject(value)) {
    return false;
  }

  const qtdProperties = Object.keys(value).length;

  if (!config) {
    return qtdProperties > 0;
  }

  const { minProperties, maxProperties } = config;

  if (isValidNumber(minProperties) && qtdProperties < minProperties) {
    return false;
  }

  if (isValidNumber(maxProperties) && qtdProperties > maxProperties) {
    return false;
  }

  return true;
}