import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentMethod } from './models/payment_method.model';
import { where } from 'sequelize';

@Injectable()
export class PaymentMethodService {
  constructor(@InjectModel(PaymentMethod) private paymentMethodModel: typeof PaymentMethod){}
  async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
    const newPaymentMethod = await this.paymentMethodModel.create(createPaymentMethodDto)
    return newPaymentMethod
  }

  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodModel.findAll()
  }

  async findOne(id: number): Promise<PaymentMethod | string> {
    const paymentMethod = await this.paymentMethodModel.findOne({ where: {id} })
    if(paymentMethod == null){
      return `${id} - ID lik payment method topilmadi`
    }
    return paymentMethod
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethod | string> {
    const paymentMethod = await this.paymentMethodModel.findOne({
      where: { id },
    });
    if (paymentMethod == null) {
      return `${id} - ID lik payment method topilmadi`;
    }
    const updatedPaymentMethod = await this.paymentMethodModel.update(updatePaymentMethodDto, { where: {id}, returning: true})
    console.log(updatePaymentMethodDto);
    return updatedPaymentMethod[1][0];
  }

  async remove(id: number): Promise<string> {
    const deletedPaymenMethod = await this.paymentMethodModel.destroy({where: {id}})
    if(deletedPaymenMethod) return `${id} - ID lik payment method o'chirildi}`
    return `${id} - ID lik payment method topilmadi`
  }
}
