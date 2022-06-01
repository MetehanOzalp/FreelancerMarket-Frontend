import { ToastrService } from 'ngx-toastr';
import { AdvertCommentResponseService } from './../../services/advert-comment-response.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdvertComment } from './../../models/advertComment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-advert-comment-response-add',
  templateUrl: './advert-comment-response-add.component.html',
  styleUrls: ['./advert-comment-response-add.component.css'],
})
export class AdvertCommentResponseAddComponent implements OnInit {
  @Input() selectedComment: AdvertComment;
  @Input() userId: number;
  advertCommentResponseAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private advertCommentResponseService: AdvertCommentResponseService
  ) {}

  ngOnInit(): void {
    this.createAdvertCommentResponseAddForm();
  }

  ngOnChanges() {
    if (this.selectedComment && this.userId) {
      this.createAdvertCommentResponseAddForm();
    }
  }

  createAdvertCommentResponseAddForm() {
    this.advertCommentResponseAddForm = this.formBuilder.group({
      userId: ['', Validators.required],
      advertCommentId: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  add() {
    this.advertCommentResponseAddForm.patchValue({
      userId: this.userId,
      advertCommentId: this.selectedComment.id,
    });
    if (this.advertCommentResponseAddForm.valid) {
      let advertCommentResponseModel = Object.assign(
        {},
        this.advertCommentResponseAddForm.value
      );
      this.advertCommentResponseService
        .add(advertCommentResponseModel)
        .subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            this.ngOnInit();
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
        'Uyarı'
      );
    }
  }
}
