import { PartialType } from '@nestjs/mapped-types';
import { CreateHumanCategoryDto } from './create-human_category.dto';

export class UpdateHumanCategoryDto extends PartialType(CreateHumanCategoryDto) {
    name?: string | undefined;
    start_age?: number | undefined;
    finish_age?: number | undefined;
    gender?: string | undefined;
}
