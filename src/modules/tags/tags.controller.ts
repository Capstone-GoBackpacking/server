import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async tags() {
    return await this.tagsService.finds();
  }

  @Delete(':id')
  async delete(@Param() params: { id: string }) {
    return await this.tagsService.deleteById(params.id);
  }

  @Put(':id')
  async update(@Param() params: { id: string }, @Body() body: any) {
    return await this.tagsService.update(params.id, body);
  }

  @Post()
  async create(@Body() body: any) {
    return await this.tagsService.create(body);
  }
}
