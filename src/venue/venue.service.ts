import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { Venue } from './models/venue.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VenueService {
  constructor(@InjectModel(Venue) private venueModel: typeof Venue) {}
  async create(createVenueDto: CreateVenueDto): Promise<Venue | null> {
    return this.venueModel.create(createVenueDto);
  }

  async findAll(): Promise<Venue[] | null> {
    return this.venueModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Venue | null | string> {
    const venue = await this.venueModel.findOne({ where: { id } });
    if (venue == null) return `${id} - ID lik venue topilmadi`;
    return venue;
  }

  async update(id: number, updateVenueDto: UpdateVenueDto): Promise<Venue | string | null | number> {
    const venue = await this.venueModel.findOne({ where: { id } });
    if (venue == null) return `${id} - ID lik venue topilmadi`;
    const updatedVenue = await this.venueModel.update(updateVenueDto, {
      where: { id },
      returning: true,
    });
    console.log(updatedVenue);
    return updatedVenue[1][0];
  }

  async remove(id: number): Promise<Venue | number | string> {
    const deletedVenue = await this.venueModel.destroy({ where: { id } });
    if (deletedVenue) {
      return `${id} - ID lik venue o'chirildi`;
    }
    return `${id} - ID lik venue topilmadi`;
  }
}
