import { Favorite } from './favorite';
import { User } from './user';

export interface Employer extends User {
  imagePath: string;
  about: string;
}
