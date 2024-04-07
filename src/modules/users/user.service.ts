import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { User } from '../../shared/models/user.model';
import { GetUserDto } from '../../shared/dto/user/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getUser(loggedInUser: User): Promise<GetUserDto> {
    const user = await this.findOneBy({ _id: loggedInUser.id });

    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }

  async findOneBy(params: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(params);
  }
}
