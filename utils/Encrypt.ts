import bcrypt from 'bcrypt';
import crypto from 'crypto';

export interface EncryptionResult {
  encrypted: string;
  iv: string;
}

export class Encrypt {
  static hash(value: string, salt = 10) {
    return bcrypt.hashSync(value, salt);
  }

  static encrypt(decrypted: string, key: string): EncryptionResult {
    const iv = Encrypt.random(8);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    const encrypted = cipher
      .update(decrypted, 'utf8', 'hex')
      .concat(cipher.final('hex'));

    return { encrypted, iv };
  }

  static decrypt(encrypted: string, key: string, iv: string): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    return decipher
      .update(encrypted, 'hex', 'utf8')
      .concat(decipher.final('utf8'));
  }

  static compare(decrypted: string, encrypted: string): boolean {
    return bcrypt.compareSync(decrypted, encrypted);
  }

  static random(size = 10): string {
    return crypto.randomBytes(size).toString('hex');
  }
}