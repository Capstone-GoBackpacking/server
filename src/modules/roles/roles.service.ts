import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Roles from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles)
    private readonly roleModel: typeof Roles,
  ) { }

  async finds() {
    return await this.roleModel.findAll();
  }

  async findOneByName(name: string) {
    if (!name) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
    const role = await this.roleModel.findOne({
      where: {
        name,
      },
    });
    return role;
  }
}
