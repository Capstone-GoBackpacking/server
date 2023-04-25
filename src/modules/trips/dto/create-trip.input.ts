import { InputType, Int, Field } from '@nestjs/graphql';

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
}

@InputType()
export class JoinTripInput {
  @Field()
  tripId: string;
  @Field()
  accountId: string;
}
