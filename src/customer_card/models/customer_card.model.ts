import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Customer } from "../../customer/models/customer.model";


interface ICustomerCardCreationAttr {
  name: string;
  phone: string;
  number: string;
  year: string;
  month: string;
  is_active: boolean;
  is_main: boolean;
  customerId: number;
}

@Table({ tableName: 'customer_card' })
export class CustomerCard extends Model<
  CustomerCard,
  ICustomerCardCreationAttr
> {
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
  phone: string;

  @Column({
    type: DataType.STRING(50),
  })
  number: string;

  @Column({
    type: DataType.STRING(50),
  })
  year: string;

  @Column({
    type: DataType.STRING(50),
  })
  month: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_main: boolean;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER
  })
  customerId: number
}