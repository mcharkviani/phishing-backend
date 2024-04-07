import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PhishingLogsSchema } from '../../shared/models/phishing-logs.model';
import { EmailModule } from '../email/email.module';
import { PhishingLogsController } from './phishing-logs.controller';
import { PhishingLogsService } from './phishing-logs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PhishingLogs', schema: PhishingLogsSchema },
    ]),
    EmailModule,
    ConfigModule,
  ],
  controllers: [PhishingLogsController],
  providers: [PhishingLogsService],
})
export class PhishingLogsModule {}
