import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Type } from '@nestjs/common';

export class CipherConfig {
  constructor(public algorithm: string, public key: string) {}
}

export interface CipherOptionsFactory {
  createCipherOptions(): Promise<CipherConfig> | CipherConfig;
}

export interface CipherModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<CipherOptionsFactory>;
  useClass?: Type<CipherOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<CipherConfig> | CipherConfig;
}
