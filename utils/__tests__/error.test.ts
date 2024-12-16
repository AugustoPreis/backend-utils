import { QueryFailedError } from 'typeorm';
import { HttpStatus } from '../../enums';
import { BadRequestError, ConflictError, InternalError, RequestError, UnauthorizedError } from '../../classes';
import { DEFAULT_ERROR_MESSAGE, errorToString, formatError, formatTypeormError } from '../error';

describe('Error utils', () => {
  it('Default Error Message', () => {
    //Verifica se o valor foi alterado, ocasionando erro nos testes
    expect(DEFAULT_ERROR_MESSAGE).toBe('Erro desconhecido');
  })

  it('Error to string', () => {
    //Error
    expect(errorToString(new Error())).toBe(DEFAULT_ERROR_MESSAGE);
    expect(errorToString(new Error(''))).toBe(DEFAULT_ERROR_MESSAGE);
    expect(errorToString(new Error(' '))).toBe(DEFAULT_ERROR_MESSAGE);
    expect(errorToString(new Error('msg erro'))).toBe('msg erro');

    //Number
    expect(errorToString(NaN)).toBe(DEFAULT_ERROR_MESSAGE);
    expect(errorToString(Infinity)).toBe(DEFAULT_ERROR_MESSAGE);
    expect(errorToString(0)).toBe('0');
    expect(errorToString(10)).toBe('10');
    expect(errorToString(1.1)).toBe('1.1');

    //String
    expect(errorToString('')).toBe(DEFAULT_ERROR_MESSAGE);
    expect(errorToString(' ')).toBe(DEFAULT_ERROR_MESSAGE);
    expect(errorToString('msg erro')).toBe('msg erro');

    //JSON
    expect(errorToString({})).toBe(DEFAULT_ERROR_MESSAGE);
    expect(errorToString([])).toBe(DEFAULT_ERROR_MESSAGE);
    expect(errorToString([{ prop: 'value' }])).toBe('[{"prop":"value"}]');
    expect(errorToString({ prop: ['value'] })).toBe('{"prop":["value"]}');

    //JSON (catch)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const circular: any = {
      someProp: 'someValue',
    };

    circular.prop = circular;

    expect(errorToString(circular)).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it('Error formatter', () => {
    //RequestError
    const requestError = new RequestError(HttpStatus.NOT_FOUND, 'NOT_F');
    const badRequestError = new BadRequestError('BR_E');
    const unauthorizedError = new UnauthorizedError('UNA_E');
    const conflictError = new ConflictError('CON_E');

    //Retornar classes sem alterar
    expect(formatError(requestError)).toBe(requestError);
    expect(formatError(badRequestError)).toBe(badRequestError);
    expect(formatError(unauthorizedError)).toBe(unauthorizedError);
    expect(formatError(conflictError)).toBe(conflictError);

    //QueryFailedError
    const queryFailedError1 = new QueryFailedError('QF', [], new Error(''));
    const queryFailedError2 = new QueryFailedError('QF', [], new Error('COM mensagem'));

    expect(formatError(queryFailedError1)).toBeInstanceOf(RequestError);
    expect(formatError(queryFailedError2)).toBeInstanceOf(RequestError);

    //Internal Error (errorToString)
    const internalError = new InternalError(DEFAULT_ERROR_MESSAGE);

    expect(formatError('')).toEqual(internalError);
    expect(formatError(' ')).toEqual(internalError);
    expect(formatError(null)).toEqual(internalError);
    expect(formatError(undefined)).toEqual(internalError);
    expect(formatError('erro')).toEqual(new InternalError('erro'));
  });

  it('TypeORM error formatter', () => {
    const queryFailed1 = new QueryFailedError('error 1', [], new Error('violates not-null constraint'));
    const queryFailed2 = new QueryFailedError('error 2', [], new Error('violates unique constraint'));
    const queryFailed3 = new QueryFailedError('error 3', [], new Error('violates foreign key constraint'));
    const queryFailed4 = new QueryFailedError('error 4', [], new Error('invalid input syntax for type'));
    const queryFailed5 = new QueryFailedError('error 5', [], new Error('syntax error at or near'));

    //sem mensagens válidas
    const queryFailed6 = new QueryFailedError('error 5', [], new Error());
    const queryFailed7 = new QueryFailedError('error 5', [], new Error(''));
    const queryFailed8 = new QueryFailedError('error 5', [], new Error(' '));

    const defaultError = new RequestError(HttpStatus.UNPROCESSABLE_ENTITY, 'Erro ao processar os dados');

    expect(formatTypeormError(queryFailed1)).toEqual(new RequestError(HttpStatus.UNPROCESSABLE_ENTITY, 'Campo obrigatório não informado'));
    expect(formatTypeormError(queryFailed2)).toEqual(new RequestError(HttpStatus.UNPROCESSABLE_ENTITY, 'Registro duplicado'));
    expect(formatTypeormError(queryFailed3)).toEqual(new RequestError(HttpStatus.UNPROCESSABLE_ENTITY, 'Registro associado não encontrado'));
    expect(formatTypeormError(queryFailed4)).toEqual(new RequestError(HttpStatus.UNPROCESSABLE_ENTITY, 'Tipo inválido'));
    expect(formatTypeormError(queryFailed5)).toEqual(new InternalError('Erro de sintaxe'));
    expect(formatTypeormError(queryFailed6)).toEqual(defaultError);
    expect(formatTypeormError(queryFailed7)).toEqual(defaultError);
    expect(formatTypeormError(queryFailed8)).toEqual(defaultError);
  });
});