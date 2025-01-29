import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './models/card.model';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card) private cardModel: typeof Card) {}
  async create(createCardDto: CreateCardDto): Promise<Card | null> {
    return this.cardModel.create(createCardDto);
  }

  async findAll(): Promise<Card[] | null> {
    return this.cardModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Card | null> {
    return this.cardModel.findOne({ where: { id }, include: { all: true } });
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card | null> {
    return this.cardModel.update(updateCardDto, {
      where: { id },
      returning: true,
    })[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.cardModel.destroy({ where: { id } });
  }
}
