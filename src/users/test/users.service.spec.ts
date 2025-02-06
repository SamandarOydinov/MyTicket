import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from '../../roles/roles.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Role } from '../../roles/models/roles.model';
import { CreateUserDto } from '../dto/create-user.dto';

describe('Users service', () => {
  let usersService: UsersService;
  const mockUsersModel = {
    create: jest.fn().mockImplementation(userStub),
    findOne: jest.fn().mockImplementation(userStub),
    findAll: jest.fn().mockImplementation(() => [userStub]),
    findByPk: jest.fn().mockImplementation(userStub),
    destroy: jest.fn(),
  };

  const mockRolesModel = {
    findOne: jest.fn().mockImplementation((value: string) => 'USER'),
  };
  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        JwtService,
        RolesService,
        {
          provide: getModelToken(User),
          useValue: mockUsersModel,
        },
        {
          provide: getModelToken(Role),
          useValue: mockRolesModel,
        },
      ],
    }).compile();
    usersService = moduleRef.get<UsersService>(UsersService);
  });
  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    describe('when create User is called', () => {
      let createUserDto: CreateUserDto;
      let newUser: User;
      beforeEach(async () => {
        createUserDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
          value: userStub().value,
        };
        newUser = await usersService.create(createUserDto);
        console.log(newUser);
      });
      it('should be create new user', () => {
        expect(newUser).toMatchObject({
          ...userStub(),
          roles: ['USER'],
        });
      });
    });
  });

  describe('getOneUser', () => {
    describe('when getOneUser is called', () => {
      test('thne it should call usersService', async () => {
        expect(await usersService.findOne(userStub().id)).toEqual(userStub());
      });
    });
  });

  describe('getAllUsers', () => {
    describe('when getAllUsers is called', () => {
      test('thne it should call usersService', async () => {
        expect(await usersService.findAll()).toEqual([userStub]);
      });
    });
  });
});
