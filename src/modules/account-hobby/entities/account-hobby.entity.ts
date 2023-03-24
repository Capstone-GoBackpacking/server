import { ObjectType, Field } from '@nestjs/graphql';
import Accounts from 'modules/accounts/entities/account.entity';
import Hobbies from 'modules/hobbies/entities/hobby.entity';
import {
  Table,
  Model,
  Column,
  ForeignKey,
  PrimaryKey,
  DataType
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'AccountHobby', timestamps: false })
export default class AccountHobby extends Model {
  @Field()
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Field()
  @ForeignKey(() => Accounts)
  @Column
  accountId: string;

  @Field()
  @ForeignKey(() => Hobbies)
  @Column
  hobbyId: string;
}
