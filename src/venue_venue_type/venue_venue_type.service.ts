import { Injectable } from '@nestjs/common';
import { CreateVenueVenueTypeDto } from './dto/create-venue_venue_type.dto';
import { UpdateVenueVenueTypeDto } from './dto/update-venue_venue_type.dto';

@Injectable()
export class VenueVenueTypeService {
  create(createVenueVenueTypeDto: CreateVenueVenueTypeDto) {
    return 'This action adds a new venueVenueType';
  }

  findAll() {
    return `This action returns all venueVenueType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venueVenueType`;
  }

  update(id: number, updateVenueVenueTypeDto: UpdateVenueVenueTypeDto) {
    return `This action updates a #${id} venueVenueType`;
  }

  remove(id: number) {
    return `This action removes a #${id} venueVenueType`;
  }
}
