import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';

@Controller('transports')
export class TransportsController {
  constructor(private readonly transportsService: TransportsService) {}

  @Post()
  create(@Body() createTransportDto: CreateTransportDto) {
    return this.transportsService.create(createTransportDto);
  }

  @Get()
  findAll() {
    return this.transportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transportsService.findById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTransportDto: UpdateTransportDto) {
    return this.transportsService.update(+id, updateTransportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transportsService.delete(+id);
  }
}
