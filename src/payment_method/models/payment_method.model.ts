import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Booking } from "../../booking/models/booking.model";

interface IPaymentMethodCreationAttr {
    name: string
}

@Table({tableName: "paymentMethod"})
export class PaymentMethod extends Model<PaymentMethod, IPaymentMethodCreationAttr> {
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
          booking: Booking
}