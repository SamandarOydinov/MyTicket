import { Injectable } from '@nestjs/common';
import { Lang } from './models/lang.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLangDto } from './dto/create-lang.dto';
import { UpdateLangDto } from './dto/update-lang.dto';

@Injectable()
export class LangService {
  constructor(@InjectModel(Lang) private langModel: typeof Lang) {}

  async createLang(createLangDto: CreateLangDto): Promise<Lang> {
    const newLang = await this.langModel.create(createLangDto);
    return newLang;
  }

  async findAllLang(): Promise<Lang[]> {
    return this.langModel.findAll();
  }

  async findByIdLang(id: number): Promise<Lang | null | string> {
    const lang = await this.langModel.findOne({ where: { id } });
    if(lang)
      return lang
    return `${id} - ID lik til topilmadi`
  }

  async updateLangById(id: number, updateLangDto: UpdateLangDto): Promise<Lang | null> {
    const lang = await this.langModel.update(updateLangDto, {
      where: { id },
      returning: true,
    });
    console.log(lang);
    return lang[1][0]
  }

  async deletelangByid(id: number): Promise<string>{
    const deletedLang = await this.langModel.destroy({where: {id}})
    if(deletedLang){
        return `${id} - ID lik til o'chirildi`;
    }
    return `${id} - ID lik til topilmadi`
  }
}
