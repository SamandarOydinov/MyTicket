import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Roles } from '../decorators/roles.decorator';
import { JwtSelfGuard } from '../guards/jwt-self.guard';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(JwtSelfGuard)
  @Roles('ADMIN', 'SUPERADMIN', '')
  @UseGuards(RolesGuard)
  @Post('add/:id')
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() createCustomerDto: CreateCustomerDto, @UploadedFile() image: any) {
    return this.customerService.create(createCustomerDto, image);
  }

  // @UseGuards(JwtSelfGuard)
  // @Roles('ADMIN', 'SUPERADMIN')
  // @UseGuards(RolesGuard)
  // @Get('all/:id')
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
