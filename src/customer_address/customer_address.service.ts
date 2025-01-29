import { Injectable } from '@nestjs/common';
import { CreateCustomerAddressDto } from './dto/create-customer_address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer_address.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerAddress } from './models/customer_address.model';

@Injectable()
export class CustomerAddressService {
  constructor(@InjectModel(CustomerAddress) private customerAddressModel: typeof CustomerAddress) {}
  async create(createCustomerAddressDto: CreateCustomerAddressDto): Promise<CustomerAddress | null> {
    return this.customerAddressModel.create(createCustomerAddressDto)
  }

  async findAll(): Promise<CustomerAddress[] | null> {
    return this.customerAddressModel.findAll({include: {all: true}})
  }

  async findOne(id: number): Promise<CustomerAddress | null> {
    return this.customerAddressModel.findOne({where: {id}, include: {all: true}})
  }

  async update(id: number, updateCustomerAddressDto: UpdateCustomerAddressDto): Promise<CustomerAddress | null> {
    return this.customerAddressModel.update(updateCustomerAddressDto, {where: {id}})[1][0]
  }

  async remove(id: number): Promise<number> {
    return this.customerAddressModel.destroy({where: {id}})
  }
}
