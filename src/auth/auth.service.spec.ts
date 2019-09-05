import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcryptjs');

const testUser =  {
  id: 'a47ecdc2-77d6-462f-9045-c440c5e4616f',
  firstName: 'test',
  lastName: 'mask',
  fullName: 'mask tape',
  mobile: 'test mobile',
  password: 'pass',
  role: 'driver',
  email: 'test@mail.com',
  drivingLicense: 'drive',
  active: true,
};
bcrypt.compare = jest.fn(() => true);
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useFactory: () => ({
            sign: jest.fn(()=>'random token')
          })
        },
        {
          provide: UserService,
          useFactory: () => ({
            findOne: jest.fn(() => testUser)
          })
        }
      ],
    }).compile();

    service = module.get< AuthService>(AuthService);
  });

  it('should return access token after login', async () => {
    const response = await service.validateUser('email', 'test@mail.com');
    expect(response).toBeInstanceOf(Object);
    expect(response.access_token).toBeDefined();
    expect(response.id).toBeDefined();
  })
});
