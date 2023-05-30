import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { IRoutes } from "@/core/routes/types/route.types";

@Controller('routes')
export class RoutesController {
  constructor(private readonly _RoutesService: RoutesService) {}

  @Get()
  index(): Promise<IRoutes.Model[]> {
    return this._RoutesService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id): Promise<IRoutes.Model> {
    return this._RoutesService.findRouteById(id);
  }

  @Post()
  create(@Body() routeDto: CreateRouteDto): Promise<IRoutes.Model> {
    return this._RoutesService.create(routeDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id,
    @Body() routeDto: UpdateRouteDto
  ): Promise<IRoutes.Model> {
    const oldRoute = await this._RoutesService.findRouteById(id);

    const newRoute = await this._RoutesService.update(id, routeDto);

    await this._RoutesService.updateRelation(oldRoute, newRoute);

    return this._RoutesService.findRouteById(newRoute.id)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id): Promise<IRoutes.Model> {
    return this._RoutesService.delete(id);
  }
}
