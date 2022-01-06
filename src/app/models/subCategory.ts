import { TopCategory } from './topCategory';
export interface SubCategory {
  id: number;
  topCategoryId: number;
  name: string;
  imagePath: string;
  topCategory: TopCategory;
}
