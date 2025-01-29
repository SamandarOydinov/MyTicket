import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models/user.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
            private readonly jwtService: JwtService
        ){}

    private async generateToken(user: User){
        const payload = {
          id: user.id,
          email: user.email,
          role: user.roles
        }
        return { token: this.jwtService.sign(payload)}
      }

    async signUp(createUserDto: CreateUserDto){
        const candidate = await this.userService.findUserByEmail(createUserDto.email)
        if(candidate){
            throw new BadRequestException("Bunday user mavjud")
        }
        
        const hashedPassword = await bcrypt.hash(createUserDto.password, 7)

        createUserDto.password = hashedPassword
        const newUser = await this.userService.create(createUserDto)

        return  this.generateToken(newUser)
    }
}
