import { Injectable } from '@nestjs/common';
import { CreateHumanCategoryDto } from './dto/create-human_category.dto';
import { UpdateHumanCategoryDto } from './dto/update-human_category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { HumanCategory } from './models/human_category.model';

@Injectable()
export class HumanCategoryService {
  constructor(@InjectModel(HumanCategory) private humanCategoryModel: typeof HumanCategory){}
  async create(createHumanCategoryDto: CreateHumanCategoryDto): Promise<HumanCategory> {
    const newHumanCategory = await this.humanCategoryModel.create(createHumanCategoryDto)
    return newHumanCategory
  }

  async findAll(): Promise<HumanCategory[]> {
    return this.humanCategoryModel.findAll()
  }

  async findOne(id: number) {
    const humanCategory = await this.humanCategoryModel.findOne({ where: { id } });
    if (humanCategory) return humanCategory;
    return `${id} - ID lik human category topilmadi`;
  }

  async update(id: number, updateHumanCategoryDto: UpdateHumanCategoryDto) {
    const humanCategory = await this.humanCategoryModel.findOne({
      where: { id },
    });
    if(humanCategory == null) return `${id} - ID lik human category topilmadi`;
    const updatedHumanCategory = await this.humanCategoryModel.update(updateHumanCategoryDto, {
      where: { id },
      returning: true,
    });
    console.log(updatedHumanCategory);
    return updatedHumanCategory[1][0];
  }

  async remove(id: number) {
    const deletedHumanCategory = await this.humanCategoryModel.destroy({ where: { id } });
    if (deletedHumanCategory) {
      return `${id} - ID lik human category o'chirildi`;
    }
    return `${id} - ID lik human category topilmadi`;
  }
}
