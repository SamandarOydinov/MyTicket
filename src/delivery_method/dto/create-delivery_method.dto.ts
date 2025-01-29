import { IsString } from "class-validator";

export class CreateDeliveryMethodDto {
    @IsString()
    name: string
}