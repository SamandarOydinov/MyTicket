import { Injectable } from '@nestjs/common';
import { CreateSeatTypeDto } from './dto/create-seat_type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SeatType } from './models/seat_type.model';

@Injectable()
export class SeatTypeService {
  constructor(@InjectModel(SeatType) private seatTypeModel: typeof SeatType){}
  async create(createSeatTypeDto: CreateSeatTypeDto): Promise<SeatType> {
    const newSeatType = await this.seatTypeModel.create(createSeatTypeDto)
    return newSeatType;
  }

  async findAll(): Promise<SeatType[]> {
    return this.seatTypeModel.findAll();
  }

  async findOne(id: number): Promise<SeatType | null | string> {
    const seat_type = await this.seatTypeModel.findOne({ where: {id} })
    if(seat_type == null){
      return `${id} - ID lik Seat type topilmadi`
    }
    return seat_type;
  }

  async update(id: number, updateSeatTypeDto: UpdateSeatTypeDto): Promise<SeatType | null | string> {
    const seat_type = await this.seatTypeModel.findOne({ where: { id } });
    if (seat_type == null) {
      return `${id} - ID lik Seat type topilmadi`;
    }
    const newSeatType = await this.seatTypeModel.update(updateSeatTypeDto, { where: {id}, returning: true })
    console.log(newSeatType);
    return newSeatType[1][0]
  }

  async remove(id: number): Promise<string> {
    const deletedSeatType = await this.seatTypeModel.destroy({ where: {id}})
    if(deletedSeatType){
      return `${id} - ID lik Seat type o'chirildi`
    }
    return `${id} - ID lik Seat type topilmadi`;
  }
}
