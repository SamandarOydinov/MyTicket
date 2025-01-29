import { PartialType } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
    eventId?: number | undefined;
    seatId?: number | undefined;
    price?: number | undefined;
    service_fee?: number | undefined;
    statusId?: number | undefined;
    ticketType?: string | undefined;
}
