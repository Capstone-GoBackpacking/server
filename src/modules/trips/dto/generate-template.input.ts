import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GenerateTemplateInput {
  @Field()
  currentLocation: string;
  @Field()
  expectDistance: number;
  @Field()
  type: string;
}
