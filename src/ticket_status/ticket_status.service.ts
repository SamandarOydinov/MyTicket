import { Injectable } from '@nestjs/common';
import { CreateTicketStatusDto } from './dto/create-ticket_status.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket_status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TicketStatus } from './models/ticket_status.model';

@Injectable()
export class TicketStatusService {
  constructor(@InjectModel(TicketStatus) private ticketStatusModel: typeof TicketStatus){}
  create(createTicketStatusDto: CreateTicketStatusDto) {
    return 'This action adds a new ticketStatus';
  }

  async findAll(): Promise<TicketStatus[] | null> {
    return this.ticketStatusModel.findAll()
  }

  async findOne(id: number):Promise<TicketStatus | null | string> {
    const ticket_status = await this.ticketStatusModel.findOne({ where: { id } });
    if (ticket_status == null) {
      return `${id} - ID lik Ticket status topilmadi`;
    }
    return ticket_status;
  }

  async update(id: number, updateTicketStatusDto: UpdateTicketStatusDto): Promise<TicketStatus | null | string> {
    const ticket_status = await this.ticketStatusModel.findOne({ where: { id } });
    if (ticket_status == null) {
      return `${id} - ID lik Ticket status topilmadi`;
    }
    const newTicketStatus = await this.ticketStatusModel.update(updateTicketStatusDto, {
      where: { id },
      returning: true,
    });
    console.log(newTicketStatus);
    return newTicketStatus[1][0];
  }

  async remove(id: number) {
    const deletedTicketStatus = await this.ticketStatusModel.destroy({
      where: { id },
    });
    if (deletedTicketStatus) {
      return `${id} - ID lik Ticket status o'chirildi`;
    }
    return `${id} - ID lik Ticket status topilmadi`;
  }
}
