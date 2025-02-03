import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { FileModule } from '../file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([Admin]), FileModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
