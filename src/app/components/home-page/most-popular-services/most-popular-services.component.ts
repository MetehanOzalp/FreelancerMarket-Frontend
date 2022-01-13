import { SubCategoryService } from './../../../services/sub-category.service';
import { SubCategory } from './../../../models/subCategory';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-most-popular-services',
  templateUrl: './most-popular-services.component.html',
  styleUrls: ['./most-popular-services.component.css'],
})
export class MostPopularServicesComponent implements OnInit {
  mostPopularSubCategories: SubCategory[] = [];
  totalCards: number = this.mostPopularSubCategories.length;
  currentPage: number = 1;
  pagePosition: string = '0%';
  cardsPerPage: number;
  totalPages: number;
  overflowWidth: string;
  cardWidth: string;
  containerWidth: number;
  @ViewChild('container', { static: true, read: ElementRef })
  container: ElementRef;
  @HostListener('window:resize') windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }
  dataLoaded: Boolean = false;

  constructor(private subCategoryService: SubCategoryService) {}

  ngOnInit(): void {
    this.dataLoaded = false;
    this.getMostPopularSubCategories();
  }

  getMostPopularSubCategories() {
    this.subCategoryService
      .getMostPopularSubCategories()
      .subscribe((response) => {
        this.mostPopularSubCategories = response.data;
        this.dataLoaded = true;
        this.totalCards = this.mostPopularSubCategories.length;
        this.cardsPerPage = this.getCardsPerPage();
        this.initializeSlider();
      });
  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${
      this.totalPages * 10
    }px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${
      this.cardsPerPage * 10
    }px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / 200);
  }

  changePage(incrementor: any) {
    let screenWidth = window.innerWidth;
    if (screenWidth > 1199) {
      this.currentPage += incrementor;
    } else if (screenWidth > 994) {
      if (incrementor < 0) {
        this.currentPage += -0.333;
      } else {
        this.currentPage += 0.333;
      }
    } else if (screenWidth > 441) {
      if (incrementor < 0) {
        this.currentPage += -0.5;
      } else {
        this.currentPage += 0.5;
      }
    } else {
      if (incrementor < 0) {
        this.currentPage += -1;
      } else {
        this.currentPage += 1;
      }
    }
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${
      10 * (this.currentPage - 1)
    }px)`;
  }
}
