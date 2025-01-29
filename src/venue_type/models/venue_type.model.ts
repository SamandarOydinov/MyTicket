import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Venue } from "src/venue/models/venue.model";
import { VenueVenueType } from "src/venue_venue_type/models/venue_venue_type.model";

interface IVenueType {
    name: string
}

@Table({tableName: "venueType"})
export class VenueType extends Model<VenueType, IVenueType> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: Number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  name: String;

  @BelongsToMany(() => Venue, () => VenueVenueType)
  venues: Venue[]
}