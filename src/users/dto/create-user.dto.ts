import { IsStrongPassword } from "class-validator";

export class CreateUserDto {
  name: string;
  email: string;
  @IsStrongPassword({minLength: 6})
  password: string;
  value: string
}
