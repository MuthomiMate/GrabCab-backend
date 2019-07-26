import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { User } from './users/user.entity';

const envVars = process.env;

@Module({
  imports: [ConfigModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: envVars.DATABASE_HOST,
    port: parseInt(envVars.DATABASE_PORT),
    username: envVars.DATABASE_USERNAME,
    password: envVars.DATABASE_PASSWORD,
    database: envVars.DATABASE_NAME,
    entities: [User],
    synchronize: true
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
