export class CreateCustomerDto {
  firstname: string;
  lastname: string;
  phone: string;
  hashedPassword: string;
  email: string;
  birth_date: Date;
  gender: string;
  langId: number;
  hashedRefreshToken: string;
}