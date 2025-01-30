import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';  

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleModel.create({
      value: createRoleDto.value.toUpperCase(),
      description: createRoleDto.description.toUpperCase()
    });
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Role | null> {
    return this.roleModel.findByPk(id);
  }

  async findRoleByvalue(value: string): Promise<Role | null> {
    return this.roleModel.findOne({where: {value: value.toUpperCase() }});
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleModel.update(updateRoleDto, { where: {id}})
  }

  async remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
