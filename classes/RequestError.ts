import { HttpStatus } from '../enums';

export class RequestError extends Error {
  httpStatusCode: HttpStatus;

  constructor(httpStatusCode: HttpStatus, message: string) {
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
    super(HttpStatus.NOT_FOUND, message);
  }
}

export class InternalError extends RequestError {
  constructor(message: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

export class BadRequestError extends RequestError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends RequestError {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends RequestError {
  constructor(message: string) {
    super(HttpStatus.FORBIDDEN, message);
  }
}

export class ConflictError extends RequestError {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, message);
  }
}