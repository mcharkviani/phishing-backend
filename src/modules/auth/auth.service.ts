import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessage } from 'src/shared/constant/error-message.constant';
import { hashPassword, validatePassword } from 'src/shared/utils/password.util';

import { UserService } from '../users/user.service';
import { RegisterUserDto } from '../../shared/dto/auth/register-user.dto';
import { IAuthResponse } from '../../shared/interfaces/auth/auth-response.interface';
import { SignInUserDto } from '../../shared/dto/auth/sign-in-user.dto';
import { User } from '../../shared/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(params: RegisterUserDto): Promise<IAuthResponse> {
    const { firstName, lastName, email, organization, password } = params;

    const emailExists = await this.userService.findOneBy({ email });

    if (emailExists) {
      throw new HttpException(
        ErrorMessage.EMAIL_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    const { hashedPassword, salt } = await hashPassword(password);

    const createdUser = await this.userService.create({
      firstName,
      lastName,
      email,
      organization,
      password: hashedPassword,
      salt,
    });

    delete createdUser.password;
    delete createdUser.salt;

    const accessToken = this.jwtService.sign({ id: createdUser._id });

    return { accessToken, user: createdUser };
  }

  async signIn(
    params: SignInUserDto,
  ): Promise<{ accessToken: string; user: User }> {
    const { email, password } = params;

    const user = await this.userService.findOneBy({ email });

    if (user && (await validatePassword(password, user.salt, user.password))) {
      const accessToken: string = await this.jwtService.signAsync({
        id: user._id,
      });

      delete user.password;
      delete user.salt;

      return { accessToken, user };
    }

    throw new BadRequestException(ErrorMessage.INVALID_CREDENTIALS);
  }
}
