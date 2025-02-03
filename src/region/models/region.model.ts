import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CustomerAddress } from '../../customer_address/models/customer_address.model';
import { Venue } from '../../venue/models/venue.model';
import { District } from '../../district/models/district.model';

interface IRegion {
  name: string;
  image: string;
}
Venue

@Table({ tableName: 'region' })
export class Region extends Model<Region, IRegion> {
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

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @HasMany(() => District)
  district: District[];

  @HasMany(() => Venue)
  venue: Venue[];

  @HasMany(() => CustomerAddress)
  customerAddress: CustomerAddress[];
}
