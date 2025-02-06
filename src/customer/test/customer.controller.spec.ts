import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../customer.controller';
import { CustomerService } from '../customer.service';
import { JwtService } from '@nestjs/jwt';
import { customerStub } from './stubs/customer.stub';
import { Customer } from '../models/customer.model';
import { CreateCustomerDto } from '../dto/create-customer.dto';

// jest.mock('../customer.service');

jest.mock('../customer.service', () => {
  return {
    CustomerService: jest.fn().mockImplementation(() => {
      return {
        create: jest.fn().mockResolvedValue(customerStub()),
        findAll: jest.fn().mockResolvedValue([customerStub()]),
        findOne: jest.fn().mockResolvedValue(customerStub()),
        remove: jest.fn().mockResolvedValue({ message: `Customer deleted` }),
      };
    }),
  };
});

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerService: CustomerService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService, JwtService],
    }).compile();
    customerController = moduleRef.get(CustomerController);
    customerService = moduleRef.get(CustomerService);
    jest.clearAllMocks();
  });
  it('Customer controller should be defined', () => {
    expect(customerController).toBeDefined();
  });

  it('Customer controller should be defined', () => {
    expect(customerService).toBeDefined();
  });

  describe('create customer', () => {
    describe('when create customer is called', () => {
      let customer: Customer | null;
      let createCustomerDto: CreateCustomerDto;
      beforeAll(async () => {
        createCustomerDto = {
          firstname: customerStub().firstname,
          lastname: customerStub().lastname,
          phone: customerStub().phone,
          birth_date: customerStub().birth_date,
          password: customerStub().password,
          email: customerStub().email,
          gender: customerStub().gender,
          langId: customerStub().langId,
        };
        customer = await customerController.create(createCustomerDto);
        console.log(customer);
      });

      test('then it should call customerService', () => {
        expect(customerService.create).toHaveBeenCalledWith(createCustomerDto);
      });

      test('then it should return customer', () => {
        expect(customer).toMatchObject({
          ...customerStub(),
          birth_date: expect.any(Date), // `birth_date` faqat `Date` ekanligini tekshiradi
        });
      });
    });
  });

  describe('Find all customers', () => {
    describe('when findAll customers is called', () => {
      let customers: Customer[] | null;
      beforeAll(async () => {
        customers = await customerController.findAll();
      });
      test('than it should call customerServices findAll method', () => {
        expect(customerService.findAll).toHaveBeenCalled();
      });
      test('than it should return customers', () => {
        expect(customers).toEqual([
          {
            ...customerStub(),
            birth_date: expect.any(Date), // `birth_date` faqat `Date` ekanligini tekshiradi
          },
        ]);
      });
    });
  });

  describe('Find one customer', () => {
    describe('when findOne customer is called', () => {
      let customer: Customer | null;
      beforeAll(async () => {
        let id = '1';
        customer = await customerController.findOne(id);
      });
      test('then it should call customerService', () => {
        expect(customerService.findOne).toHaveBeenCalledWith(1);
      });
      test('then is should return customer', () => {
        expect(customer).toMatchObject({
          ...customerStub(),
          birth_date: expect.any(Date), // `birth_date` faqat `Date` ekanligini tekshiradi
        });
      });
    });
  });

  describe('Remove customer', () => {
    describe('when remove customer is called', () => {
      let result: Object;
      beforeAll(async () => {
        result = await customerController.remove(String(customerStub().id));
      });
      test('then it should call customerServices remove method', () => {
        expect(customerService.remove).toHaveBeenCalledWith(customerStub().id);
      });
      test('then is should return customer', () => {
        expect(result).toEqual({ message: 'Customer deleted' });
      });
    });
  });
});
