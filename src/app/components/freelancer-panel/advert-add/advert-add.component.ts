import { TopCategory } from './../../../models/topCategory';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AdvertService } from './../../../services/advert.service';
import { UserService } from './../../../services/user.service';
import { Freelancer } from './../../../models/freelancer';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SubCategory } from './../../../models/subCategory';
import { SubCategoryService } from './../../../services/sub-category.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advert-add',
  templateUrl: './advert-add.component.html',
  styleUrls: ['./advert-add.component.css'],
})
export class AdvertAddComponent implements OnInit {
  freelancer: Freelancer = {};
  subCategories: SubCategory[] = [];
  topCategories: TopCategory[] = [];
  advertAddForm: FormGroup;
  selectedFile: File;
  progress: number = 0;
  filePath: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private advertService: AdvertService,
    private toastrService: ToastrService,
    private jwtHelperService: JwtHelperService,
    private subCategoryService: SubCategoryService
  ) {}

  ngOnInit(): void {
    this.getFreelancer();
    this.getSubCategories();
    this.createAdvertAddForm();
  }

  getFreelancer() {
    this.userService
      .getByUserName(
        this.jwtHelperService.decodeToken(localStorage.getItem('token')).sub
      )
      .subscribe((response) => {
        this.freelancer = response.data;
        this.advertAddForm.patchValue({
          freelancerId: this.freelancer.id,
        });
      });
  }

  getSubCategoryByTopCategoryId(topCategoryId: number) {
    let selectedSubCategories: SubCategory[] = [];
    for (let i = 0; i < this.subCategories.length; i++) {
      if (this.subCategories[i].topCategoryId == topCategoryId) {
        selectedSubCategories.push(this.subCategories[i]);
      }
    }
    return selectedSubCategories;
  }

  getSubCategories() {
    this.subCategoryService.getSubCategories().subscribe(
      (response) => {
        this.subCategories = response.data;
        let isThere: boolean = false;
        for (let i = 0; i < this.subCategories.length; i++) {
          for (let j = 0; j < this.topCategories.length; j++) {
            if (
              this.subCategories[i].topCategory.id == this.topCategories[j].id
            ) {
              isThere = true;
            }
          }
          if (!isThere) {
            this.topCategories.push(this.subCategories[i].topCategory);
          }
          isThere = false;
        }
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message, 'Hata!');
      }
    );
  }

  createAdvertAddForm() {
    this.advertAddForm = this.formBuilder.group({
      freelancerId: [this.freelancer.id, Validators.required],
      subCategoryId: ['', [Validators.required]],
      topCategoryId: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      price: ['', [Validators.required, Validators.min(0)]],
      info: ['', [Validators.required, Validators.maxLength(5000)]],
      file: ['', Validators.required],
    });
  }

  add() {
    if (this.advertAddForm.valid) {
      const formData = new FormData();
      formData.append(
        'freelancerId',
        this.advertAddForm.get('freelancerId').value
      );
      formData.append(
        'subCategoryId',
        this.advertAddForm.get('subCategoryId').value
      );
      formData.append('title', this.advertAddForm.get('title').value);
      formData.append('price', this.advertAddForm.get('price').value);
      formData.append('info', this.advertAddForm.get('info').value);
      formData.append('imagePath', this.selectedFile, this.selectedFile.name);
      this.advertService.add(formData).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              break;
            case HttpEventType.Response:
              this.toastrService.success(event.body.message, 'Başarılı');
              this.ngOnInit();
              this.progress = 0;
              this.filePath = undefined;
          }
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata');
          this.progress = 0;
        }
      );
    } else {
      this.toastrService.warning(
        'Lütfen tüm alanları eksiksiz doldurun',
        'Dikkat'
      );
    }
  }

  onFileSelected(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFile = <File>event.target.files[i];
      const file = (event.target as HTMLInputElement).files[i];
      this.advertAddForm.patchValue({
        file: file,
      });
      this.advertAddForm.get('file').updateValueAndValidity();
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
