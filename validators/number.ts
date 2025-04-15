export interface NumberValidatorConfig {
  min: number;
  max: number;
  minDecimalPlaces: number;
  maxDecimalPlaces: number;
  integer: boolean;
  float: boolean;
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isValidNumber(value: unknown, config?: Partial<NumberValidatorConfig>): value is number {
  if (!isNumber(value)) {
    return false;
  }

  if (isNaN(value) || !isFinite(value)) {
    return false;
  }

  if (!config) {
    return true;
  }

  const { min, max, minDecimalPlaces, maxDecimalPlaces, integer, float } = config;
  const decimalPlaces = value.toString().split('.')[1]?.length || 0;

  if (isValidNumber(min) && value < min) {
    return false;
  }

  if (isValidNumber(max) && value > max) {
    return false;
  }

  if (isValidNumber(minDecimalPlaces) && decimalPlaces < minDecimalPlaces) {
    return false;
  }

  if (isValidNumber(maxDecimalPlaces) && decimalPlaces > maxDecimalPlaces) {
    return false;
  }

  if (integer && !Number.isInteger(value)) {
    return false;
  }

  if (float && Number.isInteger(value)) {
    return false;
  }

  return true;
}