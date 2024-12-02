import { isValidNumber } from '.';

export interface DateValidatorConfig {
  min: Date | number;
  max: Date | number;
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function isValidDate(value: unknown, config?: Partial<DateValidatorConfig>): boolean {
  if (!isDate(value)) {
    return false;
  }

  if (!config) {
    return isValidNumber(value.getTime());
  }

  const time = value.getTime();
  const min = isDate(config.min) ? config.min.getTime() : config.min;
  const max = isDate(config.max) ? config.max.getTime() : config.max;

  if (isValidNumber(min) && time < min) {
    return false;
  }

  if (isValidNumber(max) && time > max) {
    return false;
  }

  return true;
}