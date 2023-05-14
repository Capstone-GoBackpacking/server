import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchLocationInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => [String], { nullable: true })
  tagIds?: string[];
}
