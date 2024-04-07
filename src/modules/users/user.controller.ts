import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/http.decorator';
import { LoggedInUser } from 'src/shared/decorators/logged-in-user.decorator';

import { UserService } from './user.service';
import { User } from '../../shared/models/user.model';
import { GetUserDto } from '../../shared/dto/user/get-user.dto';

@ApiTags('users')
@Controller('users')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get authorized user info' })
  @Get('me')
  async getUser(@LoggedInUser() loggedInUser: User): Promise<GetUserDto> {
    return this.userService.getUser(loggedInUser['data']);
  }
}
