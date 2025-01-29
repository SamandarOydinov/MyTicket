import { PartialType } from '@nestjs/swagger';
import { CreateCustomerAddressDto } from './create-customer_address.dto';

export class UpdateCustomerAddressDto extends PartialType(CreateCustomerAddressDto) {
    name?: string | undefined;
    street?: string | undefined;
    house?: string | undefined;
    flat?: string | undefined;
    location?: string | undefined;
    post_index?: string | undefined;
    info?: string | undefined;
    customerId?: number | undefined;
    regionId?: number | undefined;
    districtId?: number | undefined;
    // countryId?: number | undefined;
}