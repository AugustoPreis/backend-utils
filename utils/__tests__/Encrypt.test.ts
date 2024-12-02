import { Encrypt } from '..';

const key = 'chave_com_32_caracteres123456789';

describe('Encrypt', () => {
  it('Hash', () => {
    const value = Encrypt.hash('password');

    expect(value).not.toBe('password');
    expect(value).toEqual(expect.any(String));
  });

  it('Encrypt', () => {
    const { encrypted, iv } = Encrypt.encrypt('password', key);

    expect(encrypted).not.toBe('password');
    expect(encrypted).toEqual(expect.any(String));
    expect(iv).toEqual(expect.any(String));
    expect(iv.length).toBe(16);
  });

  it('Decrypt', () => {
    const { encrypted, iv } = Encrypt.encrypt('decrypted_password', key);
    const value = Encrypt.decrypt(encrypted, key, iv);

    expect(value).toBe('decrypted_password');
  });

  it('Compare', () => {
    const password = 'decrypted_password';
    const hash = Encrypt.hash(password);

    expect(Encrypt.compare(password, hash)).toBe(true);
    expect(Encrypt.compare('other_password', hash)).toBe(false);
  });

  it('Random', () => {
    const value1 = Encrypt.random(10);
    const value2 = Encrypt.random(15);

    expect(value1).toEqual(expect.any(String));
    expect(value1.length).toBe(20);
    expect(value2).toEqual(expect.any(String));
    expect(value2.length).toBe(30);
  });
});