import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'guards/gql-auth.guard';
import Accounts from 'modules/accounts/entities/account.entity';
import { AuthService } from './auth.service';
import { LoginResponseDTO } from './dto/login-response.dto';
import { AuthInput } from './dto/auth-input.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => LoginResponseDTO)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginInput') _input: AuthInput, @Context() context: any) {
    return await this.authService.login(context.user);
  }

  @Mutation(() => Accounts)
  async register(@Args('registerInput') input: AuthInput) {
    return await this.authService.register(input);
  }
}
