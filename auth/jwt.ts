import jwt from 'jsonwebtoken';
import { HttpStatus } from '../enums';
import { isValidString } from '../validators';

export interface VerifyJWTError {
  httpStatus: HttpStatus;
  message: string;
}

export type VerifyJWTCallback<Decoded> = (error: VerifyJWTError | null, decoded: Decoded | null) => void;

export async function verifyJWT<Decoded>(token: string, secretKey: string, callback: VerifyJWTCallback<Decoded>): Promise<void> {
  if (!isValidString(token)) {
    return callback({
      httpStatus: HttpStatus.UNAUTHORIZED,
      message: 'Token não informado',
    }, null);
  }

  if (!isValidString(secretKey)) {
    return callback({
      httpStatus: HttpStatus.UNAUTHORIZED,
      message: 'Chave JWT não informada',
    }, null);
  }

  new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err: jwt.VerifyErrors, decoded: Decoded & jwt.JwtPayload) => {
      if (err) {
        return reject(handleJWTVerifyError(err));
      }

      return resolve(decoded);
    });
  }).then((data: Decoded) => {
    return callback(null, data);
  }).catch((err: string) => {
    return callback({
      httpStatus: HttpStatus.UNAUTHORIZED,
      message: err,
    }, null);
  });
}

export function signJWT(values: object, secretKey: string, options?: jwt.SignOptions) {
  return jwt.sign(values, secretKey, options);
}

export function handleJWTVerifyError(error: jwt.VerifyErrors) {
  switch (error.name) {
    case 'TokenExpiredError':
      return 'Login expirado';
    case 'NotBeforeError':
      return 'Login ainda não é válido';
    case 'JsonWebTokenError':
    default:
      return 'Login inválido';
  }
}