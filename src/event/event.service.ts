import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './models/event.model';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event) private eventModel: typeof Event) {}
  async create(createEventDto: CreateEventDto) {
    return this.eventModel.create(createEventDto);
  }

  async findAll() {
    return `This action returns all event`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  async remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
