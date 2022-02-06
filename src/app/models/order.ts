import { Advert } from './advert';
export interface Order {
  id?: number;
  employerId?: number;
  advertId?: number;
  status?: boolean;
  createdDate?: Date;
  advert?: Advert;
}
