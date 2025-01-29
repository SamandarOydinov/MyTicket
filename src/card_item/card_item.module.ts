import { Module } from '@nestjs/common';
import { CardItemService } from './card_item.service';
import { CardItemController } from './card_item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardItem } from './models/card_item.model';

@Module({
  imports: [SequelizeModule.forFeature([CardItem])],
  controllers: [CardItemController],
  providers: [CardItemService],
})
export class CardItemModule {}
