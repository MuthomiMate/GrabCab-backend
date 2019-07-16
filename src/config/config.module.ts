import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import 'dotenv/config';

@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`${process.env.NODE_ENV}.env`)
        }
    ],
    exports: [ConfigService],
})
export class ConfigModule {}
