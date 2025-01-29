import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    firstname?: string | undefined;
    lastname?: string | undefined;
    phone?: string | undefined;
    hashedPassword?: string | undefined;
    email?: string | undefined;
    birth_date?: Date | undefined;
    gender?: string | undefined;
    langId?: number | undefined;
    hashedRefreshToken?: string | undefined;
}