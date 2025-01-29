import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Venue } from "src/venue/models/venue.model";

interface IVenuePhotoCreationAttr {
    venueId: string | number
    url: string
}

@Table({ tableName: 'venuePhoto', timestamps: false })
export class VenuePhoto extends Model<VenuePhoto, IVenuePhotoCreationAttr> {
  @Column({
    type: DataType.STRING(50),
  })
  url: string;

  @ForeignKey(() => Venue)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  venueId: string | number;

  @BelongsTo(() => Venue)
  venue: Venue;
}