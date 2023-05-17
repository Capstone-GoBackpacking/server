import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async locations() {
    return await this.locationsService.finds();
  }

  @Delete(':id')
  async delete(@Param() params: { id: string }) {
    return await this.locationsService.deleteById(params.id);
  }

  @Put(':id')
  async update(@Param() params: { id: string }, @Body() body: any) {
    return await this.locationsService.update(params.id, body);
  }

  @Post()
  async create(@Body() body: any) {
    return await this.locationsService.create(body);
  }
}
