import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import {
  CipherModuleAsyncOptions,
  CipherOptionsFactory,
} from './interfaces/cipher.config';
import { CIPHER_OPTIONS } from './interfaces/cipher.const';
import { CipherService } from './cipher.service';

export interface CipherConfig {
  algorithm: string;
  key: string;
}
@Global()
@Module({})
export class CipherModule {
  /**
   * Registers a configured @nestjsplus/massive Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static forRootAsync(
    cipherOptions: CipherModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: CipherModule,
      providers: [
        this.createConfigAsyncProviders(cipherOptions),
        CipherService,
      ],
      exports: [CipherService],
    };
  }

  private static createConfigAsyncProviders(
    options: CipherModuleAsyncOptions,
  ): Provider {
    if (options) {
      if (options.useFactory) {
        return {
          provide: CIPHER_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        };
      } else {
        // For useClass and useExisting...
        return {
          provide: CIPHER_OPTIONS,
          useFactory: async (optionsFactory: CipherOptionsFactory) =>
            await optionsFactory.createCipherOptions(),
          inject: [
            (options.useExisting || options.useClass) as Type<
              CipherOptionsFactory
            >,
          ],
        };
      }
    } else {
      return {
        provide: CIPHER_OPTIONS,
        useValue: {},
      };
    }
  }
}
