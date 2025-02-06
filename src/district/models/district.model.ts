import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Region } from '../../region/models/region.model';
import { Venue } from '../../venue/models/venue.model';
import { CustomerAddress } from '../../customer_address/models/customer_address.model';

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
  image: string
}

@Table({ tableName: 'district' })
export class District extends Model<District, IDistrictCreationAttr> {
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
    type: DataType.STRING(50),
  })
  image: String;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => Venue)
  venue: Venue[];

  @HasMany(() => CustomerAddress)
  customerAddress: CustomerAddress[];
}
