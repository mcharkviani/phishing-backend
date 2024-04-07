import { PickType } from '@nestjs/swagger';

import { RegisterUserDto } from './register-user.dto';

export class SignInUserDto extends PickType(RegisterUserDto, [
  'email',
  'password',
] as const) {}
