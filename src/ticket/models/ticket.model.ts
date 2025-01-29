import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Event } from "../../event/models/event.model";
import { Seat } from "../../seat/models/seat.model";
import { TicketStatus } from "../../ticket_status/models/ticket_status.model";
import { CardItem } from "../../card_item/models/card_item.model";

interface ITicket {
  eventId: number;
  seatId: number;
  price: number;
  service_fee: number;
  statusId: number;
  ticketType: string;
}

@Table({ tableName: 'ticket' })
export class Ticket extends Model<Ticket, ITicket> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
  })
  service_fee: number;

  @Column({
    type: DataType.STRING,
  })
  ticketType: string;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  eventId: number;

  @ForeignKey(() => Seat)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  seatId: number;

  @ForeignKey(() => TicketStatus)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  statusId: number;

  @HasMany(() => CardItem)
  cardItem: CardItem[]
}