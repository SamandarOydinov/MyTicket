import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { FileService } from '../file/file.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    private readonly fileService: FileService,
  ) {}
  async create(createAdminDto: CreateAdminDto, image: any): Promise<Admin | null> {
    const fileName = await this.fileService.saveFile(image)
    const newAdmin = await this.adminModel.create({...createAdminDto, image: fileName, is_creator: false});
    return newAdmin
  }

  async findAll(): Promise<Admin[] | null> {
    return this.adminModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Admin | null> {
    return this.adminModel.findOne({ where: { id }, include: { all: true } });
  }

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin | null> {
    return this.adminModel.update(updateAdminDto, { where: { id } })[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.adminModel.destroy({ where: { id } });
  }

  async addCreator(createAdminDto: CreateAdminDto, image: any): Promise<Admin | null> {
    const fileName = await this.fileService.saveFile(image)
    const creator = await this.adminModel.create({...createAdminDto, image: fileName, is_creator: true});
    await creator.save();
    return creator;
  }
}
