import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { EventType } from "../../event_type/models/event_type.model";
import { HumanCategory } from "../../human_category/models/human_category.model";
import { Lang } from "../../lang/models/lang.model";
import { Venue } from "../../venue/models/venue.model";
import { Ticket } from "../../ticket/models/ticket.model";

interface IEvent {
  name: string;
  photo: string;
  startDate: Date;
  finishDate: Date;
  startTime: Date;
  finishTime: Date;
  info: string;
  eventTypeId: number;
  humanCategoryId: number;
  venueId: number;
  langId: number;
  releaseDate: Date;
}

@Table({ tableName: 'event' })
export class Event extends Model<Event, IEvent> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
  })
  name: string;

  @Column({
    type: DataType.STRING(50),
  })
  photo: string;

  @Column({
    type: DataType.STRING(50),
  })
  startDate: string;

  @Column({
    type: DataType.STRING(50),
  })
  finishDate: string;

  @Column({
    type: DataType.STRING(50),
  })
  startTime: string;

  @Column({
    type: DataType.STRING(50),
  })
  finishTime: string;

  @Column({
    type: DataType.STRING(50),
  })
  info: string;

  @Column({
    type: DataType.STRING(50),
  })
  releaseDate: string;

  @ForeignKey(() => EventType)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  eventTypeId: number;

  @BelongsTo(() => EventType)
  eventType: EventType;

  @ForeignKey(() => HumanCategory)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  humanCategoryId: number;

  @BelongsTo(() => HumanCategory)
  humanCategory: HumanCategory;

  @ForeignKey(() => Venue)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  venueId: number;

  @BelongsTo(() => Venue)
  venue: Venue;

  @ForeignKey(() => Lang)
  @Column({
    type: DataType.INTEGER,
  })
  langId: number;

  @BelongsTo(() => Lang)
  lang: Lang;

  @HasMany(() => Ticket)
  ticket: Ticket;
}