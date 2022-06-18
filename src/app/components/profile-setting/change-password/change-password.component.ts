import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  @Input() userId: number;
  changePasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createChangePasswordForm();
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      userId: [this.userId, Validators.required],
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      newPasswordRepeat: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  update() {
    if (this.changePasswordForm.valid) {
      let changePasswordModel = Object.assign(
        {},
        this.changePasswordForm.value
      );
      this.authService.changePassword(changePasswordModel).subscribe(
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
