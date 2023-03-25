import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // @ts-ignore
  constructor(private readonly appService: AppService) { }
}
