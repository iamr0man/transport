import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';

@Controller('transports')
export class TransportsController {
  constructor(private readonly _TransportsService: TransportsService) {}

  @Post()
  create(@Body() createTransportDto: CreateTransportDto) {
    return this._TransportsService.create(createTransportDto);
  }

  @Get()
  findAll() {
    return this._TransportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this._TransportsService.findById(+id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateTransportDto: UpdateTransportDto) {
    return this._TransportsService.update({
      id: +id,
      updateTransport: updateTransportDto
    });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string) {
    const transport = await this._TransportsService.findById(+id);

    if (transport.route.length > 0) {
      throw new BadRequestException('Car cannot be deleted while it relate with routes');
    }

    return this._TransportsService.delete(+id);
  }
}
