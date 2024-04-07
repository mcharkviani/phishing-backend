import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoggedInUser } from 'src/shared/decorators/logged-in-user.decorator';
import { Auth } from 'src/shared/decorators/http.decorator';
import { ApiTags } from '@nestjs/swagger';

import { User } from '../../shared/models/user.model';
import { PhishingLogs } from '../../shared/models/phishing-logs.model';
import { NewPhishingDto } from '../../shared/dto/phishing/new-phishing.dto';
import { PhishingLogsService } from './phishing-logs.service';
import { ISendPhishingResponse } from '../../shared/interfaces/phishing/send-phishing-response.interface';

@ApiTags('phishing-logs')
@Controller('phishing-logs')
export class PhishingLogsController {
  constructor(private readonly phishingLogsService: PhishingLogsService) {}

  @Get()
  @Auth()
  async getPhishingLogs(
    @LoggedInUser() loggedInUser: User,
  ): Promise<PhishingLogs[]> {
    return this.phishingLogsService.getPhishingLogs(loggedInUser['data']);
  }

  @Post('/send')
  @Auth()
  async sendPhishing(
    @Body() body: NewPhishingDto,
    @LoggedInUser() loggedInUser: User,
  ): Promise<ISendPhishingResponse> {
    return this.phishingLogsService.sendPhishing(loggedInUser['data'], body);
  }

  @Get('/confirm/:index')
  async confirmPhishing(@Param('index') index: string): Promise<void> {
    return this.phishingLogsService.confirmPhishing(index);
  }
}
