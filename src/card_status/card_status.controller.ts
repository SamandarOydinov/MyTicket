import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardStatusService } from './card_status.service';
import { CreateCardStatusDto } from './dto/create-card_status.dto';
import { UpdateCardStatusDto } from './dto/update-card_status.dto';

@Controller('card-status')
export class CardStatusController {
  constructor(private readonly cardStatusService: CardStatusService) {}

  @Post()
  create(@Body() createCardStatusDto: CreateCardStatusDto) {
    return this.cardStatusService.create(createCardStatusDto);
  }

  @Get()
  findAll() {
    return this.cardStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardStatusDto: UpdateCardStatusDto) {
    return this.cardStatusService.update(+id, updateCardStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardStatusService.remove(+id);
  }
}
