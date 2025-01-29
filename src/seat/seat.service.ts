import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Seat } from './models/seat.model';

@Injectable()
export class SeatService {
  constructor(@InjectModel(Seat) private seatModel: typeof Seat) {}
  create(createSeatDto: CreateSeatDto): Promise<Seat | null> {
    return this.seatModel.create(createSeatDto);
  }

  findAll(): Promise<Seat[] | null | number> {
    return this.seatModel.findAll({ include: { all: true } });
  }

  findOne(id: number): Promise<Seat | null> {
    return this.seatModel.findOne({ where: { id }, include: { all: true } });
  }

  update(id: number, updateSeatDto: UpdateSeatDto): Promise<Seat | null> {
    return this.seatModel.update(updateSeatDto, { where: { id } })[1][0];
  }

  remove(id: number): Promise<Seat | number> {
    return this.seatModel.destroy({ where: { id } });
  }
}
