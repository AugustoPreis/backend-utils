import jwt from 'jsonwebtoken';
import { HttpStatus } from '../enums';
import { isValidObject, isValidString } from '../validators';

export interface VerifyJWTError {
  httpStatus: HttpStatus;
  message: string;
}

export async function verifyJWT<Decoded>(token: string, secretKey: string): Promise<Decoded & jwt.JwtPayload> {
  if (!isValidString(token)) {
    throw new Error('Token JWT não informado');
  }

  if (!isValidString(secretKey)) {
    throw new Error('Chave JWT não informada');
  }

  return await new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err: jwt.VerifyErrors, decoded: Decoded & jwt.JwtPayload) => {
      if (err) {
        const message = handleJWTVerifyError(err);

        return reject(new Error(message));
      }

      resolve(decoded);
    });
  });
}

export function signJWT(values: object, secretKey: string, options?: jwt.SignOptions) {
  if (!isValidObject(values, { minProperties: 1 })) {
    throw new Error('Valores do usuário não informados');
  }

  if (!isValidString(secretKey)) {
    throw new Error('Chave JWT não informada');
  }

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