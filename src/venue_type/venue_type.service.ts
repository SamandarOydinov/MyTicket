import { Injectable } from '@nestjs/common';
import { CreateVenueTypeDto } from './dto/create-venue_type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue_type.dto';
import { VenueType } from './models/venue_type.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VenueTypeService {
  constructor(@InjectModel(VenueType) private venueTypeModel: typeof VenueType){}
  async create(createVenueTypeDto: CreateVenueTypeDto): Promise<VenueType | null> {
    const newVenueType = await this.venueTypeModel.create(createVenueTypeDto)
    return newVenueType
  }

  async findAll(): Promise<VenueType[]> {
    return this.venueTypeModel.findAll()
  }

  async findOne(id: number): Promise<VenueType | string> {
    const venueType = await this.venueTypeModel.findOne({ where: {id}})
    if(venueType == null) return `${id} - ID lik venue type topilmadi`
    return venueType;
  }

  async update(id: number, updateVenueTypeDto: UpdateVenueTypeDto): Promise<VenueType | string> {
    const venueType = await this.venueTypeModel.findOne({ where: { id } });
    if (venueType == null) return `${id} - ID lik venue type topilmadi`;
    const updatedVenueType = await this.venueTypeModel.update(updateVenueTypeDto, { where: {id}, returning: true})
    return updatedVenueType[1][0];
  }

  async remove(id: number): Promise<string> {
    const deletedVenueType = await this.venueTypeModel.destroy({where: {id}})
    if(deletedVenueType) return `${id} - ID lik venue type o'chirildi`
    return `${id} - ID lik venue type topilmadi`;
  }
}
