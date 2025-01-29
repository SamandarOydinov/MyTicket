import { PartialType } from '@nestjs/swagger';
import { CreateSeatDto } from './create-seat.dto';

export class UpdateSeatDto extends PartialType(CreateSeatDto) {
    sector?: string | undefined;
    rowNumber?: number | undefined;
    number?: number | undefined;
    location_in_schema?: string | undefined;
    seatTypeId?: number | undefined;
    venueId?: number | undefined;
}
