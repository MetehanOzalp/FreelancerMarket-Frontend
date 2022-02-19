import { timer } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Advert } from './../../../models/advert';
import { Freelancer } from './../../../models/freelancer';
import { SubCategoryService } from './../../../services/sub-category.service';
import { ToastrService } from 'ngx-toastr';
import { AdvertService } from './../../../services/advert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TopCategory } from './../../../models/topCategory';
import { SubCategory } from './../../../models/subCategory';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-advert-edit',
  templateUrl: './advert-edit.component.html',
  styleUrls: ['./advert-edit.component.css'],
})
export class AdvertEditComponent implements OnInit {
  @Input() incomingAdvert: Advert;
  advert: Advert = {};
  subCategories: SubCategory[] = [];
  topCategories: TopCategory[] = [];
  advertEditForm: FormGroup;
  selectedFile: File;
  progress: number = 0;
  filePath: string;
  topCategoryId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private advertService: AdvertService,
    private toastrService: ToastrService,
    private subCategoryService: SubCategoryService
  ) {}

  ngOnInit(): void {
    this.getSubCategories();
    this.createAdvertAddForm();
  }

  ngOnChanges() {
    this.mappingAdvert();
    this.createAdvertAddForm();
  }

  mappingAdvert() {
    let object = JSON.stringify(this.incomingAdvert);
    this.advert = JSON.parse(object);
    if (this.advert.subCategory) {
      this.topCategoryId = this.advert.subCategory.topCategoryId;
      this.createAdvertAddForm();
    }
  }

  createAdvertAddForm() {
    this.advertEditForm = this.formBuilder.group({
      id: [this.advert.id, Validators.required],
      freelancerId: [this.advert.freelancerId, Validators.required],
      subCategoryId: [this.advert.subCategoryId, [Validators.required]],
      topCategoryId: [this.topCategoryId, [Validators.required]],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      price: ['', [Validators.required, Validators.min(0)]],
      info: ['', [Validators.required, Validators.maxLength(5000)]],
      file: [''],
    });
  }

  update() {
    if (this.advertEditForm.valid) {
      const formData = new FormData();
      formData.append('id', this.advertEditForm.get('id').value);
      formData.append(
        'freelancerId',
        this.advertEditForm.get('freelancerId').value
      );
      formData.append(
        'subCategoryId',
        this.advertEditForm.get('subCategoryId').value
      );
      formData.append('title', this.advertEditForm.get('title').value);
      formData.append('price', this.advertEditForm.get('price').value);
      formData.append('info', this.advertEditForm.get('info').value);
      if (this.selectedFile) {
        formData.append('imagePath', this.selectedFile, this.selectedFile.name);
      }
      this.advertService.update(formData).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              break;
            case HttpEventType.Response:
              this.toastrService.success(event.body.message, 'Başarılı');
              timer(400).subscribe((p) => {
                window.location.reload();
              });
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
      this.advertEditForm.patchValue({
        file: file,
      });
      this.advertEditForm.get('file').updateValueAndValidity();
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
}
