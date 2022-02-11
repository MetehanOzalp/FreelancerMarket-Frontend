import { ToastrService } from 'ngx-toastr';
import { EmployerService } from './../../../services/employer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employer } from './../../../models/employer';
import { User } from 'src/app/models/user';
import { Component, OnInit, Input } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css'],
})
export class EmployerProfileComponent implements OnInit {
  @Input() user: User;
  employer: Employer = {};
  employerUpdateForm: FormGroup;
  employerImageUpdateForm: FormGroup;
  selectedFile: File;
  progress: number = 0;
  filePath: string;

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
    this.createEmployerUpdateForm();
    this.createEmployerImageUpdateForm();
  }

  createEmployerUpdateForm() {
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

  createEmployerImageUpdateForm() {
    this.employerImageUpdateForm = this.formBuilder.group({
      id: [this.employer.id, Validators.required],
      file: ['', Validators.required],
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

  updateImage() {
    if (this.employerImageUpdateForm.valid) {
      const formData = new FormData();
      formData.append('id', this.employerImageUpdateForm.get('id').value);
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.employerService.updateImage(formData).subscribe(
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
      this.employerImageUpdateForm.patchValue({
        file: file,
      });
      this.employerImageUpdateForm.get('file').updateValueAndValidity();
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
