import { Injectable } from '@nestjs/common';
import { CreateDeliveryMethodDto } from './dto/create-delivery_method.dto';
import { UpdateDeliveryMethodDto } from './dto/update-delivery_method.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DeliveryMethod } from './models/delivery_method.model';

@Injectable()
export class DeliveryMethodService {
  constructor(@InjectModel(DeliveryMethod) private deliveryMethod: typeof DeliveryMethod){}
  async create(createDeliveryMethodDto: CreateDeliveryMethodDto): Promise<DeliveryMethod> {
    const newLang = await this.deliveryMethod.create(createDeliveryMethodDto);
    return newLang;
  }

  async findAll(): Promise<DeliveryMethod[]> {
    return this.deliveryMethod.findAll()
  }

  async findOne(id: number): Promise<DeliveryMethod | string> {
    const deliveryMethod = await this.deliveryMethod.findOne({where: {id}})
    if(deliveryMethod) return deliveryMethod
    return `${id} - ID lik delivery method topilmadi`
  }

  async update(id: number, updateDeliveryMethodDto: UpdateDeliveryMethodDto): Promise<DeliveryMethod |null | string> {
    const deliveryMethod = await this.deliveryMethod.findOne({ where: {id}})
    if(deliveryMethod == null){
      return `${id} - ID lik delivery method topilmadi`
    }
    const updatedDeliveryMethod = await this.deliveryMethod.update(updateDeliveryMethodDto, { where: {id}, returning: true })
    return updatedDeliveryMethod[1][0]
    
  }

  async remove(id: number) {
    const deletedDeliveryMethod = await this.deliveryMethod.destroy({where: {id}})
    if(deletedDeliveryMethod) return `${id} - ID lik delivery method o'chirildi`
    return `${id} - ID lik delivery method topilmadi`
  }
}
