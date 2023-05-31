import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HobbiesService } from './hobbies.service';

@Controller('hobbies')
export class HobbiesController {
  constructor(private readonly hobbiesService: HobbiesService) {}

  @Get()
  async hobbies() {
    return await this.hobbiesService.finds();
  }

  @Delete(':id')
  async delete(@Param() params: { id: string }) {
    return await this.hobbiesService.deleteById(params.id);
  }

  @Put(':id')
  async update(@Param() params: { id: string }, @Body() body: any) {
    return await this.hobbiesService.update(params.id, body);
  }

  @Post()
  async create(@Body() body: any) {
    return await this.hobbiesService.create(body);
  }
}
