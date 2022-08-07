import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Type } from '@nestjs/common';
import { CipherService } from '../cipher.service';

export class CipherConfig {
  constructor(public key: string) {}
}

export interface CipherOptionsFactory {
  createCipherOptions(): Promise<CipherConfig> | CipherConfig;
}

export function createCipherService(options: CipherConfig): CipherService {
  const client = new CipherService(options);
  return client;
}

export interface CipherModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<CipherOptionsFactory>;
  useClass?: Type<CipherOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<CipherConfig> | CipherConfig;
}
