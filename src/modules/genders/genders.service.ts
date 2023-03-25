import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Genders from './entities/gender.entity';

@Injectable()
export class GendersService {
  constructor(
    @InjectModel(Genders)
    private readonly genderModel: typeof Genders
  ) { }

  async finds(): Promise<Genders[]> {
    return await this.genderModel.findAll()
  }
}
