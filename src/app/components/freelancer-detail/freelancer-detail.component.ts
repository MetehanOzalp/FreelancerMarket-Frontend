import { Advert } from './../../models/advert';
import { AdvertService } from './../../services/advert.service';
import { Component, OnInit, Input } from '@angular/core';
import { Freelancer } from 'src/app/models/freelancer';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-freelancer-detail',
  templateUrl: './freelancer-detail.component.html',
  styleUrls: ['./freelancer-detail.component.css'],
})
export class FreelancerDetailComponent implements OnInit {
  @Input() user: User;
  freelancer: Freelancer = {};
  adverts: Advert[] = [];

  constructor(
    private advertService: AdvertService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAdvertByFreelancerId(this.user.id);
    this.userMappingToFreelancer();
  }

  userMappingToFreelancer() {
    let object = JSON.stringify(this.user);
    this.freelancer = JSON.parse(object);
  }

  getAdvertByFreelancerId(freelancerId: number) {
    this.advertService.getByFreelancerId(freelancerId).subscribe(
      (response) => {
        this.adverts = response.data;
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message, 'Hata');
      }
    );
  }
}
