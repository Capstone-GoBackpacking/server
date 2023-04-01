import { Module } from '@nestjs/common';
import { AccountsModule } from 'modules/accounts/accounts.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'strategys/local.strategy';
import { RolesModule } from 'modules/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfigs } from 'configs/jwt.config';
import { JwtStrategy } from 'strategys/jwt.strategy';

@Module({
  imports: [
    AccountsModule,
    PassportModule,
    RolesModule,
    JwtModule.register({
      secret: jwtConfigs.secret,
      signOptions: { expiresIn: jwtConfigs.expireTime },
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthModule { }
