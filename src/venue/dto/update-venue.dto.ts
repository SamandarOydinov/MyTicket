import { PartialType } from '@nestjs/mapped-types';
import { CreateVenueDto } from './create-venue.dto';

export class UpdateVenueDto extends PartialType(CreateVenueDto) {
  name?: string | undefined;
  address?: string | undefined;
  location?: string | undefined;
  site?: string | undefined;
  phone?: string | undefined;
  schema?: string[] | undefined;
  regionId?: string | number | undefined;
  districtId?: string | number | undefined;
}
