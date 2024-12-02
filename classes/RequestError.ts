import { StatusCodes } from 'http-status-codes';

export class RequestError extends Error {
  httpStatusCode: StatusCodes;

  constructor(httpStatusCode: StatusCodes, message: string) {
    super(message);

    this.httpStatusCode = httpStatusCode;
  }

  getJSON() {
    return {
      statusCode: this.httpStatusCode,
      message: this.message,
    };
  }
}

export class NotFoundError extends RequestError {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class InternalError extends RequestError {
  constructor(message: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

export class BadRequestError extends RequestError {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends RequestError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends RequestError {
  constructor(message: string) {
    super(StatusCodes.FORBIDDEN, message);
  }
}

export class ConflictError extends RequestError {
  constructor(message: string) {
    super(StatusCodes.CONFLICT, message);
  }
}