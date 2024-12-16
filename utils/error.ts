import { QueryFailedError } from 'typeorm';
import { RequestError, InternalError } from '../classes';
import { isNumber, isValidNumber, isValidString } from '../validators';
import { HttpStatus } from '../enums';

export const DEFAULT_ERROR_MESSAGE = 'Erro desconhecido';

export function formatError(dirt: unknown): RequestError {
  if (dirt instanceof RequestError) {
    return dirt;
  }

  if (dirt instanceof QueryFailedError) {
    return formatTypeormError(dirt);
  }

  const message = errorToString(dirt);

  return new InternalError(message);
}

export function formatTypeormError(queryFailedError: QueryFailedError): RequestError {
  const error = new RequestError(HttpStatus.UNPROCESSABLE_ENTITY, 'Erro ao processar os dados');
  const { message } = queryFailedError;

  if (!isValidString(message)) {
    return error;
  }

  if (message.includes('violates not-null constraint')) {
    error.message = 'Campo obrigatório não informado';
  }

  if (message.includes('violates unique constraint')) {
    error.message = 'Registro duplicado';
  }

  if (message.includes('violates foreign key constraint')) {
    error.message = 'Registro associado não encontrado';
  }

  if (message.includes('invalid input syntax for type')) {
    error.message = 'Tipo inválido';
  }

  if (message.includes('syntax error at or near')) {
    error.httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    error.message = 'Erro de sintaxe';
  }

  return error;
}

export function errorToString(error: unknown): string {
  if (error instanceof Error) {
    if (isValidString(error.message)) {
      return error.message.trim();
    }

    return DEFAULT_ERROR_MESSAGE;
  }

  if (isNumber(error)) {
    if (isValidNumber(error)) {
      return error.toString();
    }

    return DEFAULT_ERROR_MESSAGE;
  }

  if (typeof error === 'string') {
    if (isValidString(error)) {
      return error.trim();
    }

    return DEFAULT_ERROR_MESSAGE;
  }

  try {
    const jsonString = JSON.stringify(error);

    if (!jsonString || ['null', 'undefined', 'NaN', 'infinity', '{}', '[]'].includes(jsonString)) {
      return DEFAULT_ERROR_MESSAGE;
    }

    return jsonString;
  } catch {
    return DEFAULT_ERROR_MESSAGE;
  }
}