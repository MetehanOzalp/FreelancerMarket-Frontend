import { Advert } from './../../../models/advert';
import { AdvertService } from './../../../services/advert.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-most-popular-job-adverts',
  templateUrl: './most-popular-job-adverts.component.html',
  styleUrls: ['./most-popular-job-adverts.component.css'],
})
export class MostPopularJobAdvertsComponent implements OnInit {
  mostPopularJobAdverts: Advert[] = [];
  totalCards: number = this.mostPopularJobAdverts.length;
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

  constructor(private advertService: AdvertService) {}

  ngOnInit(): void {
    this.getMostPopularJobAdverts();
  }

  getMostPopularJobAdverts() {
    this.advertService.getMostPopularFreelancers().subscribe((response) => {
      this.mostPopularJobAdverts = response.data;
      while (this.mostPopularJobAdverts.length < 12) {
        this.mostPopularJobAdverts.push(response.data[0]);
      }
      this.totalCards = this.mostPopularJobAdverts.length;
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
    return Math.floor(this.container.nativeElement.offsetWidth / 250);
  }

  changePage(incrementor: any) {
    let screenWidth = window.innerWidth;
    if (screenWidth > 1200) {
      this.currentPage += incrementor;
    } else if (screenWidth > 541) {
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
