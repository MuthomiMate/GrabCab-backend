import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

export type MockType< T> = {
  [P in keyof T]: jest.Mock< {}>;
};
// @ts-ignore
export const repositoryMockFactory: () =>
MockType< Repository< any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  find: jest.fn(entity => entity),
  create: jest.fn(entity => entity),
  save: jest.fn(entity => entity)
  // ...
}));
describe('ConfigService', () => {
  let service: UserService;
  let repositoryMock: MockType< Repository< User>>;

  const testUsers: User =  {
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
      }],
    }).compile();

    service = module.get< UserService>(UserService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all Users for findAll', async () => {
    repositoryMock.find.mockReturnValue([testUsers])
    const users = await service.findAll();
    expect(users).toBeInstanceOf(Array);
    expect(users).toEqual([testUsers]);
  });

  it('should return a single user', async () => {
    repositoryMock.findOne.mockReturnValue(testUsers)
    const users = await service.findOne(testUsers.id);
    expect(users).toBeInstanceOf(Object);
    expect(users).toEqual(testUsers);
  });

  it('delete a user ', async () => {
    repositoryMock.find.mockReturnValue(testUsers);
    const users = await service.delete(testUsers.id);
    expect(users).toEqual(true);
  });

  it('should create a user', async () => {
    repositoryMock.find.mockReturnValue([testUsers]);
    const users = await service.create(testUsers);
    const {fullName, id,  ...user} = testUsers;
    expect(users).toBeInstanceOf(Object);
    expect(users.firstName).toEqual(user.firstName);
    expect(users.lastName).toEqual(user.lastName);
  });

  it('should update a user', async () => {
    repositoryMock.findOne.mockReturnValue([testUsers]);
    testUsers.firstName = 'change';
    const users = await service.update(testUsers.id, testUsers);
    expect(users).toBeInstanceOf(Object);
    expect(users.firstName).toEqual('change');
    expect(users.fullName).toEqual('change mask');
  });
});
