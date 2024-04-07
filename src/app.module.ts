import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';

config();

import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { EmailModule } from './modules/email/email.module';
import { PhishingLogsModule } from './modules/phishing-logs/phishing-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    EmailModule,
    UserModule,
    AuthModule,
    PhishingLogsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
