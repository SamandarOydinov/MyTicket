import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    name?: string | undefined;
    photo?: string | undefined;
    startDate?: Date | undefined;
    startTime?: Date | undefined;
    finishDate?: Date | undefined;
    finishTime?: Date | undefined;
    info?: string | undefined;
    eventTypeId?: number | undefined;
    humanCategoryId?: number | undefined;
    venueId?: number | undefined;
    langId?: number | undefined;
    releaseDate?: Date | undefined;
}
