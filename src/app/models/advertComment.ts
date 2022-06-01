import { AdvertCommentResponse } from './advertCommentResponse';
import { User } from './user';
export interface AdvertComment {
  id: number;
  userId: number;
  advertId: number;
  content: string;
  score: number;
  date: Date;
  user: User;
  advertCommentResponses?: AdvertCommentResponse[];
}
