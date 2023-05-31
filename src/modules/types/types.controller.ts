import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TypesService } from './types.service';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Get()
  async tags() {
    return await this.typesService.finds();
  }

  @Delete(':id')
  async delete(@Param() params: { id: string }) {
    return await this.typesService.deleteById(params.id);
  }

  @Put(':id')
  async update(@Param() params: { id: string }, @Body() body: any) {
    return await this.typesService.update(params.id, body);
  }

  @Post()
  async create(@Body() body: any) {
    return await this.typesService.create(body);
  }
}
