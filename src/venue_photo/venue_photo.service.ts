import { Injectable } from '@nestjs/common';
import { CreateVenuePhotoDto } from './dto/create-venue_photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue_photo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { VenuePhoto } from './models/venue_photo.model';

@Injectable()
export class VenuePhotoService {
  constructor(
    @InjectModel(VenuePhoto) private venuePhotoModel: typeof VenuePhoto,
  ) {}
  async create(createVenuePhotoDto: CreateVenuePhotoDto): Promise<VenuePhoto> {
    return this.venuePhotoModel.create(createVenuePhotoDto)
  }

  async findAll(): Promise<VenuePhoto[] | null> {
    return this.venuePhotoModel.findAll()
  }

  async findOne(id: number): Promise<VenuePhoto | null | string> {
    const venuePhoto = await this.venuePhotoModel.findOne({ where: { id } });
    if (venuePhoto == null) return `${id} - ID lik venuePhoto topilmadi`;
    return venuePhoto;
  }

  async update(id: number, updateVenuePhotoDto: UpdateVenuePhotoDto): Promise<VenuePhoto | string> {
    const venuePhoto = await this.venuePhotoModel.findOne({ where: { id } });
    if (venuePhoto == null) return `${id} - ID lik venuePhoto topilmadi`;
    const updatedVenue = await this.venuePhotoModel.update(updateVenuePhotoDto, {
      where: { id },
      returning: true,
    });
    console.log(updatedVenue);
    return updatedVenue[1][0];
  }

  async remove(id: number): Promise<string> {
    const deletedVenue = await this.venuePhotoModel.destroy({ where: { id } });
    if (deletedVenue) {
      return `${id} - ID lik venuePhoto o'chirildi`;
    }
    return `${id} - ID lik venuePhoto topilmadi`;
  }
}
