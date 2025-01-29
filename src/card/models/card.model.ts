import { Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Customer } from "../../customer/models/customer.model";
import { CardItem } from "../../card_item/models/card_item.model";
import { CardStatus } from "../../card_status/models/card_status.model";
import { Booking } from "../../booking/models/booking.model";


interface ICardCreationAttr {
    created_at: Date;
    finished_at: Date;
    customerId: number;
    statusId: number;
}

@Table({ tableName: 'card' })
export class Card extends Model<Card, ICardCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.DATE,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
  })
  finished_at: Date;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  customerId: number;

  @ForeignKey(() => CardStatus)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  statusId: number;

  @HasMany(() => CardItem)
  cardItem: CardItem[];

  @HasMany(() => Booking)
  booking: Booking
}