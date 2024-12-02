import { signJWT, verifyJWT } from '..';

const values = { id: 1, nome: 'admin' };
const secretKey = 'secret.key.test';

describe('JWT', () => {
  it('Sign', () => {
    const noUserError = new Error('Valores do usuário não informados');
    const noKeyError = new Error('Chave JWT não informada');

    //Sem usuário
    expect(() => signJWT(null, secretKey)).toThrow(noUserError);
    expect(() => signJWT(undefined, secretKey)).toThrow(noUserError);
    expect(() => signJWT({}, secretKey)).toThrow(noUserError);
    expect(() => signJWT([], secretKey)).toThrow(noUserError);

    //Sem chave
    expect(() => signJWT(values, '')).toThrow(noKeyError);
    expect(() => signJWT(values, '   ')).toThrow(noKeyError);
    expect(() => signJWT(values, null)).toThrow(noKeyError);
    expect(() => signJWT(values, undefined)).toThrow(noKeyError);

    //Usuário autenticado
    expect(signJWT(values, secretKey)).toEqual(expect.any(String));
    expect(signJWT(values, secretKey, { expiresIn: '1D' })).toEqual(expect.any(String));
    expect(signJWT(values, secretKey, { expiresIn: '-1D' })).toEqual(expect.any(String));
  });

  it('Verify', async () => {
    const token = signJWT(values, secretKey);
    const tokenExpired = signJWT(values, secretKey, { expiresIn: '-1d' });
    const tokenNotValid = signJWT(values, secretKey, { notBefore: '1d' });

    const noTokenError = new Error('Token JWT não informado');
    const noKeyError = new Error('Chave JWT não informada');
    const loginExpiredError = new Error('Login expirado');
    const notValidBeforeError = new Error('Login ainda não é válido');
    const invalidLoginError = new Error('Login inválido');

    //Token inválido
    expect(() => verifyJWT(null, secretKey)).rejects.toThrow(noTokenError);
    expect(() => verifyJWT(undefined, secretKey)).rejects.toThrow(noTokenError);
    expect(() => verifyJWT('', secretKey)).rejects.toThrow(noTokenError);
    expect(() => verifyJWT('  ', secretKey)).rejects.toThrow(noTokenError);

    //Chave inválida
    expect(() => verifyJWT(token, null)).rejects.toThrow(noKeyError);
    expect(() => verifyJWT(token, undefined)).rejects.toThrow(noKeyError);
    expect(() => verifyJWT(token, '')).rejects.toThrow(noKeyError);
    expect(() => verifyJWT(token, '  ')).rejects.toThrow(noKeyError);

    //Token expirado
    expect(() => verifyJWT(tokenExpired, secretKey)).rejects.toThrow(loginExpiredError);

    // Token ainda não válido
    expect(() => verifyJWT(tokenNotValid, secretKey)).rejects.toThrow(notValidBeforeError);

    // Login inválido
    expect(() => verifyJWT('invalid.token', secretKey)).rejects.toThrow(invalidLoginError);

    //Usuário autenticado
    expect(verifyJWT(token, secretKey)).resolves.toMatchObject(values);
  });
});