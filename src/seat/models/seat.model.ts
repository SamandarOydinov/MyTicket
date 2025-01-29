import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { SeatType } from "src/seat_type/models/seat_type.model";
import { Venue } from "src/venue/models/venue.model";
import { Ticket } from "../../ticket/models/ticket.model";

interface ISeatCreationAttr {
  sector: string;
  rowNumber: number;
  number: number;
  location_in_schema: string;
  seatTypeId: number;
  venueId: number;
}

@Table({ tableName: 'seat' })
export class Seat extends Model<Seat, ISeatCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: Number;

  @Column({
    type: DataType.STRING(50),
  })
  name: String;

  @Column({
    type: DataType.STRING,
  })
  sector: string;

  @Column({
    type: DataType.INTEGER,
  })
  rowNumber: number;

  @Column({
    type: DataType.INTEGER,
  })
  number: number;

  @Column({
    type: DataType.STRING,
  })
  location_in_schema: string;

  @ForeignKey(() => Venue)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  venueId: number;

  @BelongsTo(() => Venue)
  venue: Venue;

  @ForeignKey(() => SeatType)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  seatTypeId: number;

  @BelongsTo(() => SeatType)
  seatType: SeatType;

  @HasMany(() => Ticket)
  ticket: Ticket[];
}