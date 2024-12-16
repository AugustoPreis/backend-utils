import { HttpStatus } from '../../enums';
import { RequestError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalError, FieldsValidationError } from '..';

describe('Request Error', () => {
  it('Request Error (any status code)', () => {
    const badRequest = new RequestError(HttpStatus.BAD_REQUEST, 'bad request');
    const unauthorized = new RequestError(HttpStatus.UNAUTHORIZED, 'unauthorized');
    const forbidden = new RequestError(HttpStatus.FORBIDDEN, 'forbidden');
    const notFound = new RequestError(HttpStatus.NOT_FOUND, 'not found');
    const conflict = new RequestError(HttpStatus.CONFLICT, 'conflict');
    const internalServer = new RequestError(HttpStatus.INTERNAL_SERVER_ERROR, 'internal server');

    expect(badRequest.getJSON()).toEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'bad request',
    });
    expect(unauthorized.getJSON()).toEqual({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'unauthorized',
    });
    expect(forbidden.getJSON()).toEqual({
      statusCode: HttpStatus.FORBIDDEN,
      message: 'forbidden',
    });
    expect(notFound.getJSON()).toEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'not found',
    });
    expect(conflict.getJSON()).toEqual({
      statusCode: HttpStatus.CONFLICT,
      message: 'conflict',
    });
    expect(internalServer.getJSON()).toEqual({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'internal server',
    });
  });

  it('Bad Request (400)', () => {
    const error = new BadRequestError('default error message');

    expect(error.getJSON()).toEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'default error message',
    });
  });

  it('Unauthorized (401)', () => {
    const error = new UnauthorizedError('default error message');

    expect(error.getJSON()).toEqual({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'default error message',
    });
  });

  it('Forbidden (403)', () => {
    const error = new ForbiddenError('default error message');

    expect(error.getJSON()).toEqual({
      statusCode: HttpStatus.FORBIDDEN,
      message: 'default error message',
    });
  });

  it('Not Found (404)', () => {
    const error = new NotFoundError('default error message');

    expect(error.getJSON()).toEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'default error message',
    });
  });

  it('Conflict (409)', () => {
    const error = new ConflictError('default error message');

    expect(error.getJSON()).toEqual({
      statusCode: HttpStatus.CONFLICT,
      message: 'default error message',
    });
  });

  it('Internal Server (500)', () => {
    const error = new InternalError('default error message');

    expect(error.getJSON()).toEqual({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'default error message',
    });
  });

  it('Fields Validation Error (400)', () => {
    const error1 = new FieldsValidationError();
    const error2 = new FieldsValidationError([]);
    const error3 = new FieldsValidationError(['erro1', 'erro2']);

    expect(error1.getJSON()).toEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Erro na validação dos campos',
      errors: [],
    });
    expect(error2.getJSON()).toEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Erro na validação dos campos',
      errors: [],
    });
    expect(error3.getJSON()).toEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Erro na validação dos campos',
      errors: ['erro1', 'erro2'],
    });
  });
});