import { ObjectType, Field, ID } from '@nestjs/graphql';
import Tags from 'modules/tags/entities/tag.entity';
import Types from 'modules/types/entities/type.entity';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'TagType', timestamps: false })
export default class TagType extends Model {
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
  @ForeignKey(() => Types)
  @Column
  typeId: string;
}
