import { Controller, Get } from '@nestjs/common';
import { GendersService } from './genders.service';

@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Get()
  async genders() {
    return await this.gendersService.finds();
  }
}
