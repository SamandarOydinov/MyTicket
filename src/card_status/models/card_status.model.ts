import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Card } from '../../card/models/card.model';

interface ICardStatusCreationAttr {
  name: string;
}

@Table({ tableName: 'card_status' })
export class CardStatus extends Model<CardStatus, ICardStatusCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @HasMany(() => Card)
  card: Card[];
}
