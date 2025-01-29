import { PartialType } from '@nestjs/swagger';
import { CreateCardStatusDto } from './create-card_status.dto';

export class UpdateCardStatusDto extends PartialType(CreateCardStatusDto) {
    name?: string | undefined;
}