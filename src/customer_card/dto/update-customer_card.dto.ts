import { PartialType } from '@nestjs/swagger';
import { CreateCustomerCardDto } from './create-customer_card.dto';

export class UpdateCustomerCardDto extends PartialType(CreateCustomerCardDto) {
    name?: string | undefined;
    phone?: string | undefined;
    number?: string | undefined;
    year?: string | undefined;
    month?: string | undefined;
    is_active?: boolean | undefined;
    is_main?: boolean | undefined;
    customerId?: number | undefined;
}