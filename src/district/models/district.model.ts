import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Region } from 'src/region/models/region.model';
import { Venue } from 'src/venue/models/venue.model';
import { CustomerAddress } from '../../customer_address/models/customer_address.model';

interface IDistrictCreationAttr {
  name: string;
  regionId: number | string;
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
  customerAddress: CustomerAddress[]
}
