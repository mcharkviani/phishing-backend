import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('hello')
  helloWorld(): string {
    return 'Hello World!';
  }
}
