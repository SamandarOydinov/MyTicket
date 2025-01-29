import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { District } from 'src/district/models/district.model';
import { Event } from 'src/event/models/event.model';
import { Region } from 'src/region/models/region.model';
import { Seat } from 'src/seat/models/seat.model';
import { VenuePhoto } from 'src/venue_photo/models/venue_photo.model';
import { VenueType } from 'src/venue_type/models/venue_type.model';
import { VenueVenueType } from 'src/venue_venue_type/models/venue_venue_type.model';

interface IVenue {
  name: string;
  address: string;
  location: string;
  site: string;
  phone: string;
  schema: string[];
  regionId: string | number;
  districtId: string | number;
}

@Table({ tableName: 'venue', timestamps: false })
export class Venue extends Model<Venue, IVenue> {
  @Column({
    type: DataType.STRING(50),
  })
  name: string;
  @Column({
    type: DataType.STRING(50),
  })
  address: string;
  @Column({
    type: DataType.STRING(50),
  })
  location: string;
  @Column({
    type: DataType.STRING(50),
  })
  site: string;
  @Column({
    type: DataType.STRING(50),
  })
  phone: string;
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  schema: string[];

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  regionId: number | string;

  @BelongsTo(() => Region)
  region: Region;

  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  districtId: number | string;

  @BelongsTo(() => District)
  district: District;

  @HasMany(() => VenuePhoto)
  venuePhoto: VenuePhoto[]

  @BelongsToMany(() => VenueType, ()=>VenueVenueType)
  venueTypes: VenueType[]

  @HasMany(() => Seat)
    seat: Seat[]

  @HasMany(() => Event)
    eventType: Event;
}
