import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { FileModule } from '../file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([Customer]), FileModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
