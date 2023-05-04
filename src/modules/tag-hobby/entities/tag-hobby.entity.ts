import { ObjectType, Field, ID } from '@nestjs/graphql';
import Hobbies from 'modules/hobbies/entities/hobby.entity';
import Tags from 'modules/tags/entities/tag.entity';
import {
  Model,
  Table,
  Column,
  PrimaryKey,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'TagHobby', timestamps: false })
export default class TagHobby extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Field()
  @ForeignKey(() => Tags)
  @Column
  tagId: string;

  @Field()
  @ForeignKey(() => Hobbies)
  @Column
  hobbyId: string;
}
