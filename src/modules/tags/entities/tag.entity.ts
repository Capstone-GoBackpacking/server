import { ObjectType, Field, ID } from '@nestjs/graphql';
import Hobbies from 'modules/hobbies/entities/hobby.entity';
import LocationTag from 'modules/location-tag/entities/location-tag.entity';
import Locations from 'modules/locations/entities/location.entity';
import PostTag from 'modules/post-tag/entities/post-tag.entity';
import Posts from 'modules/posts/entities/post.entity';
import TagHobby from 'modules/tag-hobby/entities/tag-hobby.entity';
import TagType from 'modules/tag-type/entities/tag-type.entity';
import Types from 'modules/types/entities/type.entity';
import {
  Table,
  Model,
  PrimaryKey,
  Column,
  Unique,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'Tags', timestamps: false })
export default class Tags extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Field()
  @Unique(true)
  @Column({
    type: DataType.STRING(20),
  })
  name: string;

  @Field(() => [Locations])
  @BelongsToMany(() => Locations, () => LocationTag)
  locations: Locations[];

  @Field(() => [Posts])
  @BelongsToMany(() => Posts, () => PostTag)
  posts: Posts[];

  @Field(() => [Hobbies])
  @BelongsToMany(() => Hobbies, () => TagHobby)
  hobbies: Hobbies[];

  @Field(() => [Types])
  @BelongsToMany(() => Types, () => TagType)
  types: Types[];
}
