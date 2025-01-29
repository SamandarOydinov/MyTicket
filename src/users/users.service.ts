import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/models/roles.model';
import { UserRole } from './models/user-role.model';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(UserRole) private userRoleModel: typeof UserRole,
    private readonly roleService: RolesService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const role = await this.roleService.findByvalue(
      createUserDto.value.toUpperCase(),
    );
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const newUser = await this.userModel.create(createUserDto);

    await this.userRoleModel.create({ userId: newUser.id, roleId: role.id })
    await newUser.$set("roles", [role.id])
    await newUser.save();
    newUser.roles = [role];
    return newUser;
  }

  async activateUser(activateUserDto: ActivateUserDto){
    const user = await this.userModel.findByPk(activateUserDto.userId)
    if(user){
      user.is_active = true
      await user.save()
      return user
    }

    throw new NotFoundException("Foydalanuvchi topilmadi!");
    
  }

  async findAll() {
    return this.userModel.findAll({
      include: { all: true, attributes: ['value'] },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: {email}})
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const result = await this.userModel.destroy({ where: { id } });
    if(result){
      return `${id} - ID lik user o'chirildi`
    }
    return `${id} - ID lik user mavjud emas`
  }
}
