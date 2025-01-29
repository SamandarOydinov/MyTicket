import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Ticket } from './models/ticket.model';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket) private ticketModel: typeof Ticket) {}
  async create(createTicketDto: CreateTicketDto): Promise<Ticket | null> {
    return this.ticketModel.create(createTicketDto)
  }

  async findAll(): Promise<Ticket[] | null> {
    return this.ticketModel.findAll({include: {all: true}})
  }

  async findOne(id: number): Promise<Ticket | null> {
    return this.ticketModel.findOne({ where: {id}, include: {all: true}})
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket | number | null> {
    return this.ticketModel.update(updateTicketDto, {where: {id}, returning: true})[1][0]
  }

  async remove(id: number): Promise<number> {
    return this.ticketModel.destroy({where: {id}})
  }
}
