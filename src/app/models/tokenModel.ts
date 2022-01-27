import { User } from './user';
export interface TokenModel {
  user: User;
  jwtToken: string;
}
