import { Freelancer } from './../../../models/freelancer';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { FreelancerService } from 'src/app/services/freelancer.service';

@Component({
  selector: 'app-most-popular-freelancers',
  templateUrl: './most-popular-freelancers.component.html',
  styleUrls: ['./most-popular-freelancers.component.css'],
})
export class MostPopularFreelancersComponent implements OnInit {
  mostPopularFreelancers: Freelancer[] = [];
  totalCards: number = this.mostPopularFreelancers.length;
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

  constructor(private freelancerService: FreelancerService) {}

  ngOnInit(): void {
    this.getMostPopularFreelancers();
  }

  getMostPopularFreelancers() {
    this.freelancerService.getMostPopularFreelancers().subscribe((response) => {
      this.mostPopularFreelancers = response.data;
      while (this.mostPopularFreelancers.length < 20) {
        this.mostPopularFreelancers.push(response.data[0]);
      }
      this.totalCards = this.mostPopularFreelancers.length;
      this.cardsPerPage = this.getCardsPerPage();
      this.initializeSlider();
    });
  }

  initializeSlider() {
    if (this.totalCards < 5) {
      this.totalPages = 1.75;
    } else {
      this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    }
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
        this.currentPage += -0.334;
      } else {
        this.currentPage += 0.334;
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
