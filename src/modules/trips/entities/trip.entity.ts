import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { EDesign } from 'common/types/enums';
import Accounts from 'modules/accounts/entities/account.entity';
import Locations from 'modules/locations/entities/location.entity';
import Posts from 'modules/posts/entities/post.entity';
import RequestJoinTrip from 'modules/request-join-trip/entities/request-join-trip.entity';
import Types from 'modules/types/entities/type.entity';
import { HasManyAddAssociationMixin } from 'sequelize';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  BelongsTo,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'Trips', timestamps: false })
export default class Trips extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  name: string;

  @Field({ nullable: true })
  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
  })
  description?: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  timeEnd: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  timeStart: string;

  @Field(() => Int)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  slot: number;

  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  joined: number;

  @Field()
  @ForeignKey(() => Locations)
  @Column
  locationStartId: string;

  @Field(() => Locations)
  @BelongsTo(() => Locations)
  locationStart: Locations;

  @Field()
  @ForeignKey(() => Locations)
  @Column
  locationEndId: string;

  @Field(() => Locations)
  @BelongsTo(() => Locations)
  locationEnd: Locations;

  @Field()
  @ForeignKey(() => Accounts)
  @Column
  hostId: string;

  @Field(() => Accounts)
  @BelongsTo(() => Accounts)
  host: Accounts;

  @Field()
  @ForeignKey(() => Types)
  @Column
  typeId: string;

  @Field(() => Types)
  @BelongsTo(() => Types)
  type: Types;

  @Field(() => [Accounts])
  @BelongsToMany(() => Accounts, () => RequestJoinTrip)
  joinedMember: Accounts[];

  @Field({ nullable: true })
  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
  })
  thumbnail?: string;

  @Field(() => Float)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  distance: number;

  @Field({ nullable: true })
  @Column({
    type: DataType.ENUM(...Object.values(EDesign)),
    defaultValue: EDesign.build,
  })
  design: EDesign;

  @Field(() => [Posts])
  @HasMany(() => Posts)
  posts: Posts[];

  addJoinedMember: HasManyAddAssociationMixin<Accounts, string>;
}
