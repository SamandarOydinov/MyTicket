import { Injectable } from '@nestjs/common';
import { CreateCardItemDto } from './dto/create-card_item.dto';
import { UpdateCardItemDto } from './dto/update-card_item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CardItem } from './models/card_item.model';

@Injectable()
export class CardItemService {
  constructor(@InjectModel(CardItem) private cardItemModel: typeof CardItem) {}
  async create(createCardItemDto: CreateCardItemDto): Promise<CardItem | null> {
    return this.cardItemModel.create(createCardItemDto)
  }

  async findAll(): Promise<CardItem[] | null> {
    return this.cardItemModel.findAll({include: {all: true}})
  }

  async findOne(id: number): Promise<CardItem | null> {
    return this.cardItemModel.findOne({where: {id}, include: {all: true}})
  }

  async update(id: number, updateCardItemDto: UpdateCardItemDto): Promise<CardItem | null> {
    return this.cardItemModel.update(updateCardItemDto, {where: {id}})[1][0]
  }

  async remove(id: number): Promise<number> {
    return this.cardItemModel.destroy({where: {id}})
  }
}
