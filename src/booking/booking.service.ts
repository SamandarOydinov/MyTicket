import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './models/booking.model';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking) private bookingModel: typeof Booking) {}
  async create(createBookingDto: CreateBookingDto): Promise<Booking | null> {
    return this.bookingModel.create(createBookingDto)
  }

  async findAll(): Promise<Booking[] | null> {
    return this.bookingModel.findAll({include: {all: true}})
  }

  async findOne(id: number): Promise<Booking | null> {
    return this.bookingModel.findOne({where: {id}, include: {all: true}})
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking | null> {
    return this.bookingModel.update(updateBookingDto, {where: {id}})[1][0]
  }

  async remove(id: number): Promise<number> {
    return this.bookingModel.destroy({where: {id}})
  }
}
