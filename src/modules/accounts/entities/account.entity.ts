import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  Unique,
  AllowNull,
  BelongsTo,
  ForeignKey,
  BeforeCreate,
  HasOne,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { EStatus } from 'types/types';
import Roles from 'modules/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import Profiles from 'modules/profiles/entities/profile.entity';
import Hobbies from 'modules/hobbies/entities/hobby.entity';
import AccountHobby from 'modules/account-hobby/entities/account-hobby.entity';
import Trips from 'modules/trips/entities/trip.entity';
import RequestJoinTrip from 'modules/request-join-trip/entities/request-join-trip.entity';
import Posts from 'modules/posts/entities/post.entity';
import Comments from 'modules/comments/entities/comment.entity';
import Replies from 'modules/replies/entities/reply.entity';
import { HasOneCreateAssociationMixin } from 'sequelize';

@ObjectType()
@Table({ tableName: 'Accounts', timestamps: false })
export default class Accounts extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Field()
  @Unique(true)
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  email: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  password: string;

  @Field()
  @Column({
    type: DataType.ENUM(...Object.values(EStatus)),
    defaultValue: EStatus.enable,
  })
  status: EStatus;

  @Field()
  @ForeignKey(() => Roles)
  @AllowNull(false)
  @Column
  roleId: string;

  @Field(() => Roles)
  @BelongsTo(() => Roles)
  role: Roles;

  @Field(() => Profiles)
  @HasOne(() => Profiles)
  profile: Profiles;

  @Field(() => [Hobbies])
  @BelongsToMany(() => Hobbies, () => AccountHobby)
  hobbies: Hobbies[];

  @Field(() => [Trips])
  @BelongsToMany(() => Trips, () => RequestJoinTrip)
  joinedTrips: Trips[];

  @Field(() => [Posts])
  @HasMany(() => Posts)
  posts: Posts[];

  @Field(() => [Comments])
  @HasMany(() => Comments)
  comments: Comments[];

  @Field(() => [Replies])
  @HasMany(() => Replies)
  replies: Replies[];

  @Field(() => [Trips])
  @HasMany(() => Trips)
  trips: Trips[];

  createProfile: HasOneCreateAssociationMixin<Profiles>;

  @BeforeCreate
  static async hashPassword(instance: Accounts) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(instance.password, salt);
    instance.password = hash;
  }
}
