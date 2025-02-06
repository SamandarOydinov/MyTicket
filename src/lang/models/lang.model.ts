import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Event } from "../../event/models/event.model";
import { Customer } from "../../customer/models/customer.model";


interface ILangCreationAttr{
    name: string
}

@Table({ tableName: 'lang' })
export class Lang extends Model<Lang, ILangCreationAttr> {
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

  @HasMany(() => Event)
  event: Event;

  @HasMany(() => Customer)
  customer: Customer;
}