import { PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
    cardId?: number | undefined;
    created_at?: Date | undefined;
    finished_at?: Date | undefined;
    paymentMethodId?: number | undefined;
    deliveryMethodId?: number | undefined;
    // discountCouponId?: number | undefined;
    // statusId?: number | undefined;
}