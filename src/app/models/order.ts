import { User } from 'src/app/models/user';
import { Advert } from './advert';
export interface Order {
  id?: number;
  userId?: number;
  advertId?: number;
  status?: boolean;
  createdDate?: Date;
  advert?: Advert;
  user?: User;
}
