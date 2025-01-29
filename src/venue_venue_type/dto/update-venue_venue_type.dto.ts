import { PartialType } from '@nestjs/mapped-types';
import { CreateVenueVenueTypeDto } from './create-venue_venue_type.dto';

export class UpdateVenueVenueTypeDto extends PartialType(CreateVenueVenueTypeDto) {
    venueId?: string | number | undefined;
    venueTypeId?: string | number | undefined;
}