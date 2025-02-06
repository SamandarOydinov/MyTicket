import { IsStrongPassword } from "class-validator";

export class CreateUserDto {
  name: string;
  email: string;
  @IsStrongPassword()
  password: string;
  value: string
}
