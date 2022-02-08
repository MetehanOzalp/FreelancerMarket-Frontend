import { ToastrService } from 'ngx-toastr';
import { EmployerService } from './../../../services/employer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employer } from './../../../models/employer';
import { User } from 'src/app/models/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css'],
})
export class EmployerProfileComponent implements OnInit {
  @Input() user: User;
  employer: Employer = {};
  employerUpdateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employerService: EmployerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.userMappingToEmployer();
  }

  userMappingToEmployer() {
    let object = JSON.stringify(this.user);
    this.employer = JSON.parse(object);
    this.createFreelancerUpdateForm();
  }

  createFreelancerUpdateForm() {
    this.employerUpdateForm = this.formBuilder.group({
      id: [this.employer.id, Validators.required],
      name: [
        this.employer.name,
        [Validators.required, Validators.minLength(3)],
      ],
      surName: [
        this.employer.surName,
        [Validators.required, Validators.minLength(3)],
      ],
      email: [this.employer.email, [Validators.required, Validators.email]],
      about: [this.employer.about],
    });
  }

  update() {
    if (this.employerUpdateForm.valid) {
      let updateModel = Object.assign({}, this.employerUpdateForm.value);
      this.employerService.update(updateModel).subscribe(
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
