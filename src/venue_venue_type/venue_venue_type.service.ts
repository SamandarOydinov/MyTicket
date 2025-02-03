import { Injectable } from '@nestjs/common';
import { CreateVenueVenueTypeDto } from './dto/create-venue_venue_type.dto';
import { UpdateVenueVenueTypeDto } from './dto/update-venue_venue_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { VenueVenueType } from './models/venue_venue_type.model';

@Injectable()
export class VenueVenueTypeService {
  constructor(@InjectModel(VenueVenueType) private venueVenueTypeModel: typeof VenueVenueType,) {}
  create(createVenueVenueTypeDto: CreateVenueVenueTypeDto): Promise<VenueVenueType | null> {
    return this.venueVenueTypeModel.create(createVenueVenueTypeDto)
  }

  findAll(): Promise<VenueVenueType[] | null> {
    return this.venueVenueTypeModel.findAll({include: {all: true}})
  }

  findOne(id: number): Promise<VenueVenueType | null> {
    return this.venueVenueTypeModel.findOne({where: {id}, include: {all: true}})
  }

  update(id: number, updateVenueVenueTypeDto: UpdateVenueVenueTypeDto): Promise<VenueVenueType | null> {
    return this.venueVenueTypeModel.update(updateVenueVenueTypeDto, {where: {id}})[1][0]
  }

  remove(id: number): Promise<number> {
    return this.venueVenueTypeModel.destroy({where: {id}})
  }
}
