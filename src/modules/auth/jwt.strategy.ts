import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

import { UserService } from '../users/user.service';
import { ErrorMessage } from '../../shared/constant/error-message.constant';
import { User } from '../../shared/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super(
      (() => {
        const strategyOptions: StrategyOptions = {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET,
        };
        return strategyOptions;
      })(),
    );
  }

  async validate(payload: {
    id: string;
    lat: number;
    ext: number;
  }): Promise<{ data: User }> {
    const { id } = payload;

    const user = await this.userService.findOneBy({
      _id: id,
    });

    if (!user) {
      throw new UnauthorizedException(ErrorMessage.UNAUTHORIZED);
    }

    return { data: user };
  }
}
