import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models/user.model';
import { SignInDto } from './dto/sign-in.dto';

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

    async signIn(signInDto: SignInDto) {
        const user = await this.userService.findUserByEmail(
          signInDto.email,
        );

        if(!user) {
            throw new UnauthorizedException("Email yoki password noto'g'ri")
        }

        console.log('signInDto.password: ', signInDto.password);
        console.log('user.password: ', user.password);
        const isValidPassword = bcrypt.compareSync(signInDto.password, user.password)
        console.log("validPassWord: ", isValidPassword);
        if(!isValidPassword){
            throw new UnauthorizedException("Email yoki password noto'g'ri");
        }

        console.log(user.roles[0].value);

        const value = signInDto.value.toUpperCase()

        // if(user.roles[0].value !== signInDto.value.toUpperCase()){
        for (const element of user.roles) {
            if(element.value == value){
                return this.generateToken(user);
            }
        }
        throw new ForbiddenException("Sizda bunday role yo'q")

        
    }
}
