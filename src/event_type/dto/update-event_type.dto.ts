import { PartialType } from '@nestjs/swagger';
import { CreateEventTypeDto } from './create-event_type.dto';

export class UpdateEventTypeDto extends PartialType(CreateEventTypeDto) {
    name?: string | undefined;
    parent_event_type_id?: number | undefined;
}