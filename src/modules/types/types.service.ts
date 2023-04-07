import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Types from './entities/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectModel(Types)
    private readonly typeModel: typeof Types,
  ) {}

  async findById(id: string): Promise<Types | null> {
    return await this.typeModel.findByPk(id);
  }

  async finds(): Promise<Types[]> {
    return await this.typeModel.findAll();
  }
}
