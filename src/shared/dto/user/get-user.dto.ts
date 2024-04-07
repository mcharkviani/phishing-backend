import mongoose from 'mongoose';

export class GetUserDto {
  id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
}
