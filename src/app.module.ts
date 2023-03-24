import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RolesModule } from './modules/roles/roles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsModule } from './modules/accounts/accounts.module';
import { GendersModule } from './modules/genders/genders.module';
import { ProfilesModule } from './profiles/profiles.module';
import SequelizeConfig from './configs/sequelize.config';

@Module({
  imports: [
    SequelizeModule.forRoot(SequelizeConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    RolesModule,
    AccountsModule,
    GendersModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
