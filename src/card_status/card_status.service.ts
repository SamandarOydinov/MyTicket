import { Injectable } from '@nestjs/common';
import { CreateCardStatusDto } from './dto/create-card_status.dto';
import { UpdateCardStatusDto } from './dto/update-card_status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CardStatus } from './models/card_status.model';

@Injectable()
export class CardStatusService {
  constructor(@InjectModel(CardStatus) private cardStatusModel: typeof CardStatus) {}

  async create(createCardStatusDto: CreateCardStatusDto): Promise<CardStatus | null> {
    return this.cardStatusModel.create(createCardStatusDto)
  }

  async findAll(): Promise<CardStatus[] | null> {
    return this.cardStatusModel.findAll({include: {all: true}})
  }

  async findOne(id: number): Promise<CardStatus | null> {
    return this.cardStatusModel.findOne({where: {id}, include: {all: true}})
  }

  async update(id: number, updateCardStatusDto: UpdateCardStatusDto): Promise<CardStatus | null> {
    return this.cardStatusModel.update(updateCardStatusDto, {where: {id}})[1][0]
  }

  async remove(id: number): Promise<number> {
    return this.cardStatusModel.destroy({where: {id}})
  }
}
