import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import {
  CipherModuleAsyncOptions,
  CipherOptionsFactory,
  createCipherService,
} from './interfaces/cipher.config';
import { CIPHER_OPTIONS } from './interfaces/cipher.const';
import { CipherService } from './cipher.service';

export interface CipherConfig {
  algorithm: string;
  key: string;
}
@Global()
@Module({
  providers: [CipherService],
  exports: [CipherService],
})
export class CipherModule {
  /**
   * Registers a configured @nestjsplus/massive Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static forRootAsync(options: CipherModuleAsyncOptions): DynamicModule {
    const provider: Provider = {
      inject: [CIPHER_OPTIONS],
      provide: CipherService,
      useFactory: (options: CipherConfig) => createCipherService(options),
    };
    return {
      module: CipherModule,
      providers: [this.createConfigAsyncProviders(options), provider],
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
            (options.useExisting ||
              options.useClass) as Type<CipherOptionsFactory>,
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
