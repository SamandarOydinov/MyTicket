import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Event } from '../../event/models/event.model';

interface IEventTypeCreationAttr {
  name: string;
  parent_event_type_id: number;
}

@Table({ tableName: 'event_type' })
export class EventType extends Model<EventType, IEventTypeCreationAttr> {
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

  @ForeignKey(() => EventType)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  parent_event_type_id: number;

  @HasMany(() => Event)
  eventType: Event;
}
