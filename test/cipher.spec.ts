import { Test } from '@nestjs/testing';
import { CipherService } from '../src/cipher.service';
import { CipherConfig } from '../src/interfaces/cipher.config';
describe('Cipher Service', () => {
  let cipherService: CipherService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CipherService,
        {
          provide: CipherConfig,
          useValue: {
            get: jest.fn((key: string) => {
              // this is being super extra, in the case that you need multiple keys with the `get` method
              if (key === 'key') {
                return 'key';
              }
              return 'key';
            }),
          },
        },
      ],
    }).compile();

    cipherService = module.get(CipherService);
  });

  describe('encript data', () => {
    it('call CipherService.encrypt and CipherService.encrypt and valid the correct flow', () => {
      const toEncript = "test";
      const encrypted = cipherService.encrypt(toEncript);

      console.log('Encrypted : ', encrypted);
      const decripted = cipherService.decrypt(encrypted);
      console.log('Decripted : ', decripted);
      expect(decripted).toEqual(toEncript);
    });
  });
});
