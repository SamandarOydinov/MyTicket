import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Card } from '../../card/models/card.model';
import { Ticket } from '../../ticket/models/ticket.model';

interface ICardItemCreationAttr {
  quantity: number;
}

@Table({ tableName: 'card_item' })
export class CardItem extends Model<CardItem, ICardItemCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;

  @ForeignKey(() => Card)
  @Column({
    type: DataType.INTEGER,
  })
  cardId: number;

  @ForeignKey(() => Ticket)
  @Column({
    type: DataType.INTEGER,
  })
  ticketId: number;
}
