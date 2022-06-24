import { HttpException, HttpStatus } from '@nestjs/common';

export class CipherException extends HttpException {
  constructor() {
    super('Cipher library exception', HttpStatus.FAILED_DEPENDENCY);
  }
}
