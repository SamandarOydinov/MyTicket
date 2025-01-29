import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Booking } from '../../booking/models/booking.model';

interface IDeliveryMethodCreationAttr {
  name: string;
}

@Table({ tableName: 'deliveryMethod' })
export class DeliveryMethod extends Model<
  DeliveryMethod,
  IDeliveryMethodCreationAttr
> {
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

  @HasMany(() => Booking)
  booking: Booking;
}
