import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { FileService } from '../file/file.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) private customerModel: typeof Customer,
    // private readonly fileService: FileService,
  ) {}
  // async create(createCustomerDto: CreateCustomerDto, image: any): Promise<Customer | null> {
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer | null> {
    // const fileName = await this.fileService.saveFile(image)
    // return this.customerModel.create({ ...createCustomerDto, image: fileName });
    return this.customerModel.create({...createCustomerDto, hashedPassword: ""});
  }

  async findAll(): Promise<Customer[] | null> {
    return this.customerModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Customer | null> {
    return this.customerModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.update(updateCustomerDto, {
      where: { id },
    })[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.customerModel.destroy({ where: { id } });
  }
}
