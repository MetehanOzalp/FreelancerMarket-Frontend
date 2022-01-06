import { AdvertComment } from './advertComment';
import { SubCategory } from './subCategory';
export interface Advert {
  id: number;
  freelancerId: number;
  subCategoryId: number;
  title: string;
  price: number;
  info: string;
  imagePath: string;
  date: Date;
  subCategory: SubCategory;
  advertComments: AdvertComment[];
}