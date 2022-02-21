import { Favorite } from './favorite';
import { Advert } from './advert';
import { FreelancerComment } from './freelancerComment';
import { User } from './user';
import { Skill } from './skill';

export interface Freelancer extends User {
  imagePath?: string;
  about?: string;
  appellation?: string;
  averageScore?: number;
  skills?: Skill[];
  adverts?: Advert[];
  freelancerComments?: FreelancerComment[];
}
