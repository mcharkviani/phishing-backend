import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterUserDto } from '../../shared/dto/auth/register-user.dto';
import { IAuthResponse } from '../../shared/interfaces/auth/auth-response.interface';
import { SignInUserDto } from '../../shared/dto/auth/sign-in-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create user account' })
  @Post('sign-up')
  async register(@Body() params: RegisterUserDto): Promise<IAuthResponse> {
    return this.authService.register(params);
  }

  @ApiOperation({ summary: 'Sign in user' })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() data: SignInUserDto): Promise<IAuthResponse> {
    return this.authService.signIn(data);
  }
}
