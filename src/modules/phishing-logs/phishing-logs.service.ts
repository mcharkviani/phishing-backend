import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomGenerator } from 'src/shared/utils/random-generator.util';
import { getContent, htmlWrapper } from 'src/shared/utils/html-wrapper.util';

import { User } from '../../shared/models/user.model';
import { PhishingLogs } from '../../shared/models/phishing-logs.model';
import { NewPhishingDto } from '../../shared/dto/phishing/new-phishing.dto';
import { EmailService } from '../email/email.service';
import { PhishingStatus } from '../../shared/enum/phishing-status.enum';
import { SuccessMessage } from '../../shared/constant/success-message.constant';
import { ISendPhishingResponse } from '../../shared/interfaces/phishing/send-phishing-response.interface';

@Injectable()
export class PhishingLogsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    @InjectModel(PhishingLogs.name)
    private phishingLogsModel: Model<PhishingLogs>,
  ) {}

  async sendPhishing(
    loggedInUser: User,
    params: NewPhishingDto,
  ): Promise<ISendPhishingResponse> {
    const { email } = params;
    const { _id } = loggedInUser;
    const generatedHash = randomGenerator();

    const header = 'Discover Your Next Adventure';
    const template = getContent(
      `${this.configService.get('APP_URL')}/api/phishing-logs/confirm/${generatedHash}`,
      header,
      'Embark on an unforgettable journey and explore new horizons with our exclusive travel offers.',
    );

    await this.emailService.sendMail({
      to: email,
      subject: 'Special limited-time offer',
      text: htmlWrapper(header, template),
    });

    await this.phishingLogsModel.create({
      generatedHash,
      from: _id,
      to: email,
      text: header,
      template: template,
    });

    return { success: true, message: SuccessMessage.EMAIL_SENT_SUCCESSFULLY };
  }

  async confirmPhishing(generatedHash: string): Promise<void> {
    await this.phishingLogsModel.updateOne(
      { generatedHash },
      { status: PhishingStatus.CLICKED },
    );
  }

  async getPhishingLogs(loggedInUser: User): Promise<PhishingLogs[]> {
    return this.phishingLogsModel
      .find({ from: loggedInUser.id })
      .sort({ updatedAt: -1 });
  }
}
