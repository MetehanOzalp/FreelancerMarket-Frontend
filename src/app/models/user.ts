import { Favorite } from './favorite';
export interface User {
  id?: number;
  name?: string;
  surName?: string;
  userName?: string;
  email?: string;
  password?: string;
  imagePath?: string;
  favorities?: Favorite[];
}
