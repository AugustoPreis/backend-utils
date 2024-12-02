import { StatusCodes } from 'http-status-codes';
import { RequestError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalError } from '..';

describe('Request Error', () => {
  it('Request Error (any status code)', () => {
    const badRequest = new RequestError(StatusCodes.BAD_REQUEST, 'bad request');
    const unauthorized = new RequestError(StatusCodes.UNAUTHORIZED, 'unauthorized');
    const forbidden = new RequestError(StatusCodes.FORBIDDEN, 'forbidden');
    const notFound = new RequestError(StatusCodes.NOT_FOUND, 'not found');
    const conflict = new RequestError(StatusCodes.CONFLICT, 'conflict');
    const internalServer = new RequestError(StatusCodes.INTERNAL_SERVER_ERROR, 'internal server');

    expect(badRequest.getJSON()).toEqual({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'bad request',
    });
    expect(unauthorized.getJSON()).toEqual({
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'unauthorized',
    });
    expect(forbidden.getJSON()).toEqual({
      statusCode: StatusCodes.FORBIDDEN,
      message: 'forbidden',
    });
    expect(notFound.getJSON()).toEqual({
      statusCode: StatusCodes.NOT_FOUND,
      message: 'not found',
    });
    expect(conflict.getJSON()).toEqual({
      statusCode: StatusCodes.CONFLICT,
      message: 'conflict',
    });
    expect(internalServer.getJSON()).toEqual({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'internal server',
    });
  });

  it('Bad Request (400)', () => {
    const error = new BadRequestError('default error message');

    expect(error.getJSON()).toEqual({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'default error message',
    });
  });
});

it('Unauthorized (401)', () => {
  const error = new UnauthorizedError('default error message');

  expect(error.getJSON()).toEqual({
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'default error message',
  });
});

it('Forbidden (403)', () => {
  const error = new ForbiddenError('default error message');

  expect(error.getJSON()).toEqual({
    statusCode: StatusCodes.FORBIDDEN,
    message: 'default error message',
  });
});

it('Not Found (404)', () => {
  const error = new NotFoundError('default error message');

  expect(error.getJSON()).toEqual({
    statusCode: StatusCodes.NOT_FOUND,
    message: 'default error message',
  });
});

it('Conflict (409)', () => {
  const error = new ConflictError('default error message');

  expect(error.getJSON()).toEqual({
    statusCode: StatusCodes.CONFLICT,
    message: 'default error message',
  });
});

it('Internal Server (500)', () => {
  const error = new InternalError('default error message');

  expect(error.getJSON()).toEqual({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'default error message',
  });
});