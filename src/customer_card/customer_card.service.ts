import { Injectable } from '@nestjs/common';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer_card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerCard } from './models/customer_card.model';

@Injectable()
export class CustomerCardService {
  constructor(@InjectModel(CustomerCard) private customerCardModel: typeof CustomerCard) {}
  async create(createCustomerCardDto: CreateCustomerCardDto): Promise<CustomerCard | null> {
    return this.customerCardModel.create(createCustomerCardDto)
  }

  async findAll(): Promise<CustomerCard[] | null> {
    return this.customerCardModel.findAll({include: {all: true}})
  }

  async findOne(id: number): Promise<CustomerCard | null> {
    return this.customerCardModel.findOne({where: {id}, include: {all: true}})
  }

  async update(id: number, updateCustomerCardDto: UpdateCustomerCardDto): Promise<CustomerCard | null> {
    return this.customerCardModel.update(updateCustomerCardDto, {where: {id}})[1][0]
  }

  async remove(id: number): Promise<number> {
    return this.customerCardModel.destroy({where: {id}})
  }
}
