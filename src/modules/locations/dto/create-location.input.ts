import { InputType, Field } from '@nestjs/graphql';
import { EStatus } from 'types/types';
// import { EStatus } from 'types/types';

@InputType()
export class CreateLocationInput {
  @Field()
  name: string;
  @Field()
  address: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ defaultValue: EStatus.enable })
  status?: string;
  @Field()
  lng: string;
  @Field()
  lat: string;
  @Field(() => [String])
  tags: string[];
}
