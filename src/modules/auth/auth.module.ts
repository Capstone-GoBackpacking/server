import { Module } from '@nestjs/common';
import { AccountsModule } from 'modules/accounts/accounts.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'common/strategys/local.strategy';
import { RolesModule } from 'modules/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfigs } from 'configs/jwt.config';
import { JwtStrategy } from 'common/strategys/jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    AccountsModule,
    RolesModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConfigs.secret,
      signOptions: { expiresIn: jwtConfigs.expireTime },
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
