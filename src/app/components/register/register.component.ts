import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  freelancerRegisterForm: FormGroup;
  employerRegisterForm: FormGroup;

  ngOnInit(): void {
    this.createFreelancerRegisterForm();
    this.createEmployerRegisterForm();
  }

  createFreelancerRegisterForm() {
    this.freelancerRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  createEmployerRegisterForm() {
    this.employerRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  registerForFreelancer() {
    if (this.freelancerRegisterForm.valid) {
      let registerModel = Object.assign({}, this.freelancerRegisterForm.value);
      this.authService.registorForFreelancer(registerModel).subscribe(
        (response) => {
          this.router.navigate(['/']);
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata');
        }
      );
    } else {
      this.toastrService.warning(
        'Lütfen tüm alanları eksiksiz doldurun!',
        'Dikkat'
      );
    }
  }

  registerForEmployer() {
    if (this.employerRegisterForm.valid) {
      let registerModel = Object.assign({}, this.employerRegisterForm.value);
      this.authService.registorForEmployer(registerModel).subscribe(
        (response) => {
          this.router.navigate(['/']);
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata');
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
