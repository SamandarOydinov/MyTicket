import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Lang } from '../../lang/models/lang.model';
import { CustomerAddress } from '../../customer_address/models/customer_address.model';
import { CustomerCard } from '../../customer_card/models/customer_card.model';
import { Card } from '../../card/models/card.model';

interface ICustomer {
  firstname: string;
  lastname: string;
  phone: string;
  hashedPassword: string;
  email: string;
  birth_date: Date;
  gender: string;
  langId: number;
  hashedRefreshToken: string;
}

@Table({ tableName: 'customer' })
export class Customer extends Model<Customer, ICustomer> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
  })
  firstname: string;

  @Column({
    type: DataType.STRING(50),
  })
  lastname: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  hashedPassword: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.DATE,
  })
  birth_date: Date;

  @Column({
    type: DataType.STRING(6),
  })
  gender: string;

  @Column({
    type: DataType.STRING,
  })
  hashedRefreshToken: string;

  @ForeignKey(() => Lang)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  langId: number;

  @HasMany(() => CustomerAddress)
  customerAddress: CustomerAddress[];

  @HasMany(() => CustomerCard)
  customerCard: CustomerCard[];

  @HasMany(() => Card)
  card: Card[];
}
