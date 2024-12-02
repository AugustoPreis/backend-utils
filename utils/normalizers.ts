import { isNumber, isString, isValidNumber, isValidString } from '../validators';

export interface NormalizeStringConfig {
  trim: boolean;
}

export interface NormalizeNumberConfig {
  min: number;
  max: number;
  integer: boolean;
}

export function string(value: unknown, config?: Partial<NormalizeStringConfig>): string | null {
  let normalized: string | number = value as string | number;

  if (isNumber(normalized)) {
    normalized = normalized.toString();
  }

  if (!isString(normalized)) {
    return null;
  }

  if (!config) {
    return normalized;
  }

  const { trim } = config;

  if (trim) {
    normalized = normalized.trim();
  }

  return normalized;
}

export function number(value: unknown, config?: Partial<NormalizeNumberConfig>): number | null {
  let normalized: string | number = value as string | number;

  if (isValidString(normalized) && normalized !== 'NaN') {
    normalized = Number(normalized);
  }

  if (!isValidNumber(normalized)) {
    return null;
  }

  if (!config) {
    return normalized;
  }

  const { min, max, integer } = config;

  if (isValidNumber(min) && normalized < min) {
    normalized = min;
  }

  if (isValidNumber(max) && normalized > max) {
    normalized = max;
  }

  if (integer && !isValidNumber(normalized, { integer: true })) {
    normalized = Math.round(normalized);
  }

  return normalized;
}

export function boolean(value: unknown): boolean {
  if (isString(value)) {
    return value.trim() === 'true';
  }

  return !!value;
}

export function id(value: unknown): number | null {
  return number(value, { integer: true, min: 1 });
}