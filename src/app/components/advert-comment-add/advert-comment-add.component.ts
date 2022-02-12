import { AdvertCommentService } from './../../services/advert-comment.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-advert-comment-add',
  templateUrl: './advert-comment-add.component.html',
  styleUrls: ['./advert-comment-add.component.css'],
})
export class AdvertCommentAddComponent implements OnInit {
  @Input() userId: number;
  @Input() advertId: number;
  advertCommentAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private advertCommentService: AdvertCommentService
  ) {}

  ngOnInit(): void {
    this.createAdvertCommentAddForm();
  }

  createAdvertCommentAddForm() {
    this.advertCommentAddForm = this.formBuilder.group({
      userId: [this.userId, Validators.required],
      advertId: [this.advertId, [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  add() {
    if (this.advertCommentAddForm.valid) {
      let advertCommentModel = Object.assign(
        {},
        this.advertCommentAddForm.value
      );
      this.advertCommentService.add(advertCommentModel).subscribe(
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
        'Dikkat'
      );
    }
  }
}
