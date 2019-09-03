import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';

@ Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(),
    UserModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
      context: ({ req }) => ({ req })
    }),
    AuthModule
  ]
})
export class AppModule {}
