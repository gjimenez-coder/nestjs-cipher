import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { CipherException } from './exceptions/cipher.exception';
import { CipherConfig } from './interfaces/cipher.config';

@Injectable()
export class CipherService {
  protected readonly config: CipherConfig;

  constructor(config: CipherConfig) {
    this.config = config;
  }

  encrypt(data: string) {
    try {
      const cipher = crypto.createCipheriv(
        this.config.algorithm,
        this.config.key,
        '',
      );

      const encryptedData =
        cipher.update(data, 'utf8', 'base64') + cipher.final('base64');

      return encryptedData;
    } catch (e) {
      console.log('Cipher exception : ', e);

      throw new CipherException();
    }
  }

  decrypt(data: string) {
    try {
      const decipher = crypto.createDecipheriv(
        this.config.algorithm,
        this.config.key,
        '',
      );

      const decripted =
        decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');

      return decripted;
    } catch (e) {
      console.log('Cipher exception : ', e);
      throw new CipherException();
    }
  }
}
