import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { CipherException } from './exceptions/cipher.exception';
import { CipherConfig } from './interfaces/cipher.config';
import { CIPHER_OPTIONS } from './interfaces/cipher.const';

@Injectable()
export class CipherService {
  constructor(
    @Inject(CIPHER_OPTIONS) private readonly _cipherOptions: CipherConfig,
  ) {}

  encrypt(data: string) {
    console.log('chiper' + JSON.stringify(this._cipherOptions));

    try {
      const cipher = crypto.createCipheriv(
        this._cipherOptions.algorithm,
        this._cipherOptions.key,
        '',
      );

      const encryptedData =
        cipher.update(data, 'utf8', 'base64') + cipher.final('base64');

      return encryptedData;
    } catch (e) {
      throw new CipherException();
    }
  }

  decrypt(data: string) {
    try {
      const decipher = crypto.createDecipheriv(
        this._cipherOptions.algorithm,
        this._cipherOptions.key,
        '',
      );

      const decripted =
        decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');

      return decripted;
    } catch (e) {
      throw new CipherException();
    }
  }
}
