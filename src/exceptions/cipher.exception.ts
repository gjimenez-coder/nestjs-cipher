import { HttpException, HttpStatus } from '@nestjs/common';

export class CipherException extends HttpException {
  constructor(ex: any) {
    super(
      'Cipher library exception :' + JSON.stringify(ex),
      HttpStatus.FAILED_DEPENDENCY,
    );
  }
}
