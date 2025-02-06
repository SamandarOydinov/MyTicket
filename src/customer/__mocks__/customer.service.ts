import { customerStub } from "../test/stubs/customer.stub";


export const customerService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(customerStub()),
  findAll: jest.fn().mockResolvedValue([customerStub()]),
  findOne: jest.fn().mockResolvedValue(customerStub()),
  remove: jest.fn().mockResolvedValue({ message: "Customer o'chirildi" }),
});