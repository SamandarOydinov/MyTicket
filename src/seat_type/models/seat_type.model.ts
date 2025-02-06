import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Seat } from "../../seat/models/seat.model";

interface ISeatType {
    name: string
}

@Table({ tableName: 'seat_type', timestamps: false })
export class SeatType extends Model<SeatType, ISeatType> {
  @Column({
    type: DataType.STRING(50),
  })
  name: String;

  @HasMany(() => Seat)
  seat: Seat[] 

}