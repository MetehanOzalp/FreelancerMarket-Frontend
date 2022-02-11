import { HttpEvent, HttpEventType } from '@angular/common/http';
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
  freelancerImageUpdateForm: FormGroup;
  selectedFile: File;
  progress: number = 0;
  filePath: string;

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
    this.createFreelancerImageUpdateForm();
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

  createFreelancerImageUpdateForm() {
    this.freelancerImageUpdateForm = this.formBuilder.group({
      id: [this.freelancer.id, Validators.required],
      file: ['', Validators.required],
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

  updateImage() {
    if (this.freelancerImageUpdateForm.valid) {
      const formData = new FormData();
      formData.append('id', this.freelancerImageUpdateForm.get('id').value);
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.freelancerService.updateImage(formData).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              break;
            case HttpEventType.Response:
              this.toastrService.success(event.body.message, 'Başarılı');
              this.ngOnInit();
              this.progress = 0;
          }
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata');
          this.progress = 0;
        }
      );
    }
  }

  onFileSelected(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFile = <File>event.target.files[i];
      const file = (event.target as HTMLInputElement).files[i];
      this.freelancerImageUpdateForm.patchValue({
        file: file,
      });
      this.freelancerImageUpdateForm.get('file').updateValueAndValidity();
    }
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        if (/^image\//.test(this.selectedFile.type)) {
          this.filePath = (<FileReader>event.target).result.toString();
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
