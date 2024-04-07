import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { transporterConfig } from 'src/shared/config/nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport(transporterConfig);
  }

  async sendMail(params: {
    to: string;
    subject: string;
    text: string;
  }): Promise<void> {
    await this.transporter.sendMail({
      ...params,
      from: this.configService.get('FROM'),
    });
  }
}
