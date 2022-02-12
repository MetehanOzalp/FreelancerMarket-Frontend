import { User } from './user';
export interface AdvertComment {
  id: number;
  userId: number;
  advertId: number;
  content: string;
  date: Date;
  user: User;
}
