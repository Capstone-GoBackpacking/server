import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SearchLocationInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => [String], { nullable: true })
  tagIds?: string[];
}

@InputType()
export class DirectionInput {
  @Field(() => Int)
  top: number;
  @Field()
  direction: string;
}
