import { PartialType } from '@nestjs/swagger';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {
    created_at?: Date | undefined;
    finished_at?: Date | undefined;
    customerId?: number | undefined;
    statusId?: number | undefined;
}
