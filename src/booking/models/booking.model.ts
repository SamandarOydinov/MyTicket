import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { PaymentMethod } from "../../payment_method/models/payment_method.model";
import { DeliveryMethod } from "../../delivery_method/models/delivery_method.model";
import { Card } from "../../card/models/card.model";

interface IBookingCreationAttr {
  cardId: number;
  created_at: Date;
  finished_at: Date;
  paymentMethodId: number;
  deliveryMethodId: number;
//   discountCouponId: number;
//   statusId: number;
}

@Table({ tableName: 'booking' })
export class Booking extends Model<Booking, IBookingCreationAttr> {
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

  @ForeignKey(() => Card)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'RESTRICT',
  })
  cardId: number;

  @ForeignKey(() => PaymentMethod)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'RESTRICT',
  })
  paymentMethodId: number;

  @ForeignKey(() => DeliveryMethod)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'RESTRICT',
  })
  deliveryMethodId: number;

  //   @ForeignKey(() => DiscountCoupon)
  //   @Column({
  //     type: DataType.INTEGER,
  //     onDelete: 'RESTRICT',
  //   })
  //   discountCouponId: number;

  //   @ForeignKey(() => BookingStatus)
  //   @Column({
  //     type: DataType.INTEGER,
  //     onDelete: 'RESTRICT',
  //   })
  //   statusId: number;
}