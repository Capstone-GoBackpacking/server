import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTripInput {
  @Field()
  name: string;
  @Field({ nullable: true })
  description?: string;
  @Field(() => Int)
  numberMembers: number;
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
}
