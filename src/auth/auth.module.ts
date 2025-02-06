import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '.././users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: "MysecretKey",
      signOptions: { expiresIn: "15h"}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
