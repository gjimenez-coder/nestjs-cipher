import { Injectable } from '@nestjs/common';
import Blowfish from 'egoroof-blowfish';
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
      const bf = new Blowfish(
        this.config.key,
        Blowfish.MODE.ECB,
        Blowfish.PADDING.NULL,
      );
      const encrypted = Buffer.from(bf.encode(data)).toString('base64');
      return encrypted;
    } catch (e) {
      console.log('Cipher exception : ', e);
      throw new CipherException();
    }
  }

  decrypt(data: string) {
    try {
      const bf = new Blowfish(
        this.config.key,
        Blowfish.MODE.ECB,
        Blowfish.PADDING.NULL,
      );
      const binarytring = Buffer.from(data, 'base64');
      const decoded = bf.decode(binarytring, Blowfish.TYPE.STRING);
      return decoded;
    } catch (e) {
      console.log('Cipher exception : ', e);
      throw new CipherException();
    }
  }
}
