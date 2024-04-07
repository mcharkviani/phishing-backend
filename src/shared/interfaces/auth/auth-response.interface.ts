import { User } from 'src/shared/models/user.model';

export class IAuthResponse {
  accessToken: string;
  user: User;
}
