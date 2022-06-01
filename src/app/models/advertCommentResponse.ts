import { User } from './user';
export interface AdvertCommentResponse {
  id?: number;
  userId?: number;
  user?: User;
  advertCommentId?: number;
  content?: string;
  date?: Date;
}
