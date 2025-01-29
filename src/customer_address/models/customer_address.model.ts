import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Customer } from '../../customer/models/customer.model';
import { Region } from '../../region/models/region.model';
import { District } from '../../district/models/district.model';

interface ICustomerAddressCreationAttr {
  name: string;
  street: string;
  house: string;
  flat: string;
  location: string;
  post_index: string;
  info: string;
  customerId: number;
  regionId: number;
  districtId: number;
//   countryId: number
}

@Table({ tableName: 'customer_address' })
export class CustomerAddress extends Model<
  CustomerAddress,
  ICustomerAddressCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  street: string;

  @Column({
    type: DataType.STRING,
  })
  house: string;

  @Column({
    type: DataType.STRING,
  })
  flat: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.STRING,
  })
  post_index: string;

  @Column({
    type: DataType.STRING,
  })
  info: string;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  customerId: number;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  regionId: number;

  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  districtId: number;

//   @ForeignKey(() => Country)
//   @Column({
//     type: DataType.INTEGER,
//     onDelete: 'Restrict',
//   })
//   countryId: number;
}
