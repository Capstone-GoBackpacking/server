import { InputType, Int, Field } from '@nestjs/graphql';
import { EDesign } from 'common/types/enums';

@InputType()
export class CreateTripInput {
  @Field()
  name: string;
  @Field({ nullable: true })
  description?: string;
  @Field()
  timeEnd: string;
  @Field()
  timeStart: string;
  @Field(() => Int)
  slot: number;
  @Field()
  locationStartId: string;
  @Field()
  locationEndId: string;
  @Field()
  typeId: string;
  @Field({ nullable: true })
  thumbnail: string;
  @Field({ nullable: true })
  design: EDesign;
}

@InputType()
export class JoinTripInput {
  @Field()
  tripId: string;
  @Field()
  accountId: string;
}

@InputType()
export class MyTripInput {
  @Field()
  accountId: string;
}
