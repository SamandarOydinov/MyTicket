import { Injectable } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event_type.dto';
import { UpdateEventTypeDto } from './dto/update-event_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { EventType } from './models/event_type.model';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectModel(EventType) private eventTypeModel: typeof EventType,
  ) {}
  async create(
    createEventTypeDto: CreateEventTypeDto,
  ): Promise<EventType | null> {
    return this.eventTypeModel.create(createEventTypeDto);
  }

  async findAll(): Promise<EventType[] | null> {
    return this.eventTypeModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<EventType | null> {
    return this.eventTypeModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(
    id: number,
    updateEventTypeDto: UpdateEventTypeDto,
  ): Promise<EventType | null> {
    return this.eventTypeModel.update(updateEventTypeDto, {
      where: { id },
    })[1][0];
  }

  async remove(id: number): Promise<EventType | number> {
    return this.eventTypeModel.destroy({ where: { id } });
  }
}
