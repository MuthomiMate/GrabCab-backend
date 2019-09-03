import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('ConfigService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
        provide: AuthService,
        useValue: 'test',
      }],
    }).compile();

    service = module.get< AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
