import { timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Freelancer } from './../../../models/freelancer';
import { User } from './../../../models/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.css'],
})
export class FreelancerProfileComponent implements OnInit {
  @Input() user: User;
  freelancer: Freelancer = {};
  freelancerUpdateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private freelancerService: FreelancerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.userMappingToFreelancer();
  }

  userMappingToFreelancer() {
    let object = JSON.stringify(this.user);
    this.freelancer = JSON.parse(object);
    this.createFreelancerUpdateForm();
  }

  createFreelancerUpdateForm() {
    this.freelancerUpdateForm = this.formBuilder.group({
      id: [this.freelancer.id, Validators.required],
      name: [
        this.freelancer.name,
        [Validators.required, Validators.minLength(3)],
      ],
      surName: [
        this.freelancer.surName,
        [Validators.required, Validators.minLength(3)],
      ],
      email: [this.freelancer.email, [Validators.required, Validators.email]],
      about: [this.freelancer.about],
      appellation: [this.freelancer.appellation],
    });
  }

  update() {
    if (this.freelancerUpdateForm.valid) {
      let updateModel = Object.assign({}, this.freelancerUpdateForm.value);
      this.freelancerService.update(updateModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.data) {
            responseError.error.data.forEach((element: string) => {
              this.toastrService.error(element, 'Hata');
            });
          } else {
            this.toastrService.error(responseError.error.message, 'Hata');
            this.ngOnInit();
          }
        }
      );
    } else {
      this.toastrService.warning(
        'Lütfen tüm alanları eksiksiz doldurun!',
        'Dikkat'
      );
    }
  }
}
