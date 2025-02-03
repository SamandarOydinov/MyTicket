import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/models/roles.model';
import { UserRole } from './models/user-role.model';
import { ActivateUserDto } from './dto/activate-user.dto';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(UserRole) private userRoleModel: typeof UserRole,
    private readonly roleService: RolesService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const role = await this.roleService.findRoleByvalue(
      createUserDto.value.toUpperCase(),
    );
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const newUser = await this.userModel.create(createUserDto);

    await this.userRoleModel.create({ userId: newUser.id, roleId: role.id });
    await newUser.$set('roles', [role.id]);
    await newUser.save();
    newUser.roles = [role];
    return newUser;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userModel.findByPk(addRoleDto.userId);
    const role = await this.roleService.findRoleByvalue(addRoleDto.value);

    if (role && user) {
      await user.$add('roles', role.id);
      const updateUser = await this.userModel.findByPk(addRoleDto.userId, {
        include: { all: true },
      });
    } else {
      throw new NotFoundException('Foydalanuvchi yoki role topilmadi!');
    }
  }

  async removeRole(addRoleDto: AddRoleDto) {
    const user = await this.userModel.findByPk(addRoleDto.userId);
    const role = await this.roleService.findRoleByvalue(addRoleDto.value);

    if (role && user) {
      await user.$remove('roles', role.id);
      const updateUser = await this.userModel.findByPk(addRoleDto.userId, {
        include: { all: true },
      });
    } else {
      throw new NotFoundException('Foydalanuvchi yoki role topilmadi!');
    }
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userModel.findByPk(activateUserDto.userId);
    if (user) {
      user.is_active = true;
      await user.save();
      return user;
    }

    throw new NotFoundException('Foydalanuvchi topilmadi!');
  }

  async deActivateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userModel.findByPk(activateUserDto.userId);
    if (user) {
      user.is_active = false;
      await user.save();
      return user;
    }

    throw new NotFoundException('Foydalanuvchi topilmadi!');
  }

  async findAll() {
    return this.userModel.findAll({
      include: { all: true, attributes: ['value'] },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { email: email },
      include: {
        model: Role,
        attributes: ['value'],
        through: { attributes: [] },
      },
    });
  }

  async findOne(id: number) {
    return this.userModel.findOne({where: {id}, include: {all: true}})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const result = await this.userModel.destroy({ where: { id } });
    if (result) {
      return `${id} - ID lik user o'chirildi`;
    }
    return `${id} - ID lik user mavjud emas`;
  }
}
