import { Module } from '@nestjs/common';
import { CardStatusService } from './card_status.service';
import { CardStatusController } from './card_status.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardStatus } from './models/card_status.model';

@Module({
  imports: [SequelizeModule.forFeature([CardStatus])],
  controllers: [CardStatusController],
  providers: [CardStatusService],
})
export class CardStatusModule {}
