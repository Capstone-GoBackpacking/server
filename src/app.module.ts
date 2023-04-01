import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RolesModule } from './modules/roles/roles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsModule } from './modules/accounts/accounts.module';
import { GendersModule } from './modules/genders/genders.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { HobbiesModule } from './modules/hobbies/hobbies.module';
import { AccountHobbyModule } from './modules/account-hobby/account-hobby.module';
import { LocationsModule } from './modules/locations/locations.module';
import { TagsModule } from './modules/tags/tags.module';
import { LocationTagModule } from './modules/location-tag/location-tag.module';
import { TripsModule } from './modules/trips/trips.module';
import { TypesModule } from './modules/types/types.module';
import { RequestJoinTripModule } from './modules/request-join-trip/request-join-trip.module';
import { PostsModule } from './modules/posts/posts.module';
import { PostTagModule } from './modules/post-tag/post-tag.module';
import { CommentsModule } from './modules/comments/comments.module';
import { RepliesModule } from './modules/replies/replies.module';
import { AuthModule } from './auth/auth.module';
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
    HobbiesModule,
    AccountHobbyModule,
    LocationsModule,
    TagsModule,
    LocationTagModule,
    TripsModule,
    TypesModule,
    RequestJoinTripModule,
    PostsModule,
    PostTagModule,
    CommentsModule,
    RepliesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
