import { EMAIL, CPF, CPF_FORMATADO, CNPJ, CNPJ_FORMATADO, URL, CEP, CEP_FORMATADO, IP } from '..';

describe('Regex', () => {
  it('Email', () => {
    expect(EMAIL.test('')).toBe(false);
    expect(EMAIL.test('email')).toBe(false);
    expect(EMAIL.test('email@')).toBe(false);
    expect(EMAIL.test('email@email')).toBe(false);
    expect(EMAIL.test('email@email.')).toBe(false);
    expect(EMAIL.test('@email.com')).toBe(false);

    expect(EMAIL.test('abc@email.com')).toBe(true);
    expect(EMAIL.test('a@a.abc')).toBe(true);
    expect(EMAIL.test('value@gmail.com')).toBe(true);
    expect(EMAIL.test('value@host.net')).toBe(true);
  });

  it('CPF', () => {
    expect(CPF.test('')).toBe(false);
    expect(CPF.test('11_digitos_')).toBe(false);
    expect(CPF.test('101010101010')).toBe(false);
    expect(CPF.test('1010101010')).toBe(false);

    expect(CPF.test('10101010101')).toBe(true);
    expect(CPF.test('00000000000')).toBe(true);
    expect(CPF.test('99999999999')).toBe(true);
  });


  it('CPF Formatado', () => {
    expect(CPF_FORMATADO.test('')).toBe(false);
    expect(CPF_FORMATADO.test('11.111.111-11')).toBe(false);
    expect(CPF_FORMATADO.test('10101010101')).toBe(false);
    expect(CPF_FORMATADO.test('1010101010')).toBe(false);

    expect(CPF_FORMATADO.test('101.010.101-01')).toBe(true);
    expect(CPF_FORMATADO.test('000.000.000-00')).toBe(true);
    expect(CPF_FORMATADO.test('999.999.999-99')).toBe(true);
  });


  it('CNPJ', () => {
    expect(CNPJ.test('')).toBe(false);
    expect(CNPJ.test('14_digitos____')).toBe(false);
    expect(CNPJ.test('141414141414141')).toBe(false);
    expect(CNPJ.test('1414141414141')).toBe(false);

    expect(CNPJ.test('14141414141414')).toBe(true);
    expect(CNPJ.test('00000000000000')).toBe(true);
    expect(CNPJ.test('99999999999999')).toBe(true);
  });


  it('CNPJ Formatado', () => {
    expect(CNPJ_FORMATADO.test('')).toBe(false);
    expect(CNPJ_FORMATADO.test('1.141.414/1414-14')).toBe(false);
    expect(CNPJ_FORMATADO.test('14141414141414')).toBe(false);
    expect(CNPJ_FORMATADO.test('1414141414141')).toBe(false);

    expect(CNPJ_FORMATADO.test('14.141.414/1414-14')).toBe(true);
    expect(CNPJ_FORMATADO.test('00.000.000/0000-00')).toBe(true);
    expect(CNPJ_FORMATADO.test('99.999.999/9999-99')).toBe(true);
  });


  it('URL', () => {
    expect(URL.test('')).toBe(false);
    expect(URL.test('localhost:3000')).toBe(false);
    expect(URL.test('tcp:191.191.0.0')).toBe(false);

    expect(URL.test('http://localhost:8080')).toBe(true);
    expect(URL.test('http://google.com')).toBe(true);
    expect(URL.test('https://google.com')).toBe(true);
  });


  it('CEP', () => {
    expect(CEP.test('')).toBe(false);
    expect(CEP.test('8digitos')).toBe(false);
    expect(CEP.test('1010101')).toBe(false);
    expect(CEP.test('101010101')).toBe(false);

    expect(CEP.test('10101010')).toBe(true);
    expect(CEP.test('00000000')).toBe(true);
    expect(CEP.test('99999999')).toBe(true);
  });


  it('CEP Formatado', () => {
    expect(CEP_FORMATADO.test('')).toBe(false);
    expect(CEP_FORMATADO.test('8digitos')).toBe(false);
    expect(CEP_FORMATADO.test('10101-01')).toBe(false);
    expect(CEP_FORMATADO.test('10101-0101')).toBe(false);

    expect(CEP_FORMATADO.test('10101-010')).toBe(true);
    expect(CEP_FORMATADO.test('00000-000')).toBe(true);
    expect(CEP_FORMATADO.test('99999-999')).toBe(true);
  });


  it('IP', () => {
    expect(IP.test('')).toBe(false);
    expect(IP.test('192.168.0')).toBe(false);
    expect(IP.test('192.168.0.')).toBe(false);

    expect(IP.test('192.168.0.0')).toBe(true);
    expect(IP.test('127.0.0.0')).toBe(true);
  });
});