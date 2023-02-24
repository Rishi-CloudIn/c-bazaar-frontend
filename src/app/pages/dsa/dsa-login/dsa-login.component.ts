import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiCallService } from 'src/app/services/apiCall.service';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-dsa-login',
  templateUrl: './dsa-login.component.html',
  styleUrls: ['./dsa-login.component.css'],
})
export class DsaLoginComponent implements OnInit {
  loginForm!: FormGroup;
  otpForm!: FormGroup;
  isChecked: boolean = false;
  showPassword: boolean = false;
  userId: string = '';
  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // $('#name').focus();
    this.loginForm = this.fb.group({
      googleUser: [false],
      userName: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.isChecked = true;
      return;
    }
    this.auth.dsaLogin(this.loginForm.value).subscribe((r) => {
      console.error(r);
      if (r.status) {
        this.alert.fireToastS(r.message[0]);
        this.isChecked = false;
        this.userId = r.response.userId;
        sessionStorage.setItem('userId', r.response.userId);
        sessionStorage.setItem('accessToken', r.response.accessToken);
        if (r.role == 'fo') {
          this.router.navigate(['fo/dashboard']);
        } else this.router.navigate(['dsa/dashboard']);
      }
    });
  }

  gLogin() {
    // this.validateLogin = false;
    this.auth.GoogleAuth();
  }

  public togglePassword() {
    this.showPassword = !this.showPassword;
  }

  validateLogin(field: any) {
    if (
      ((this.isChecked && this.loginForm.controls[field].invalid) ||
        (this.loginForm.controls[field].invalid &&
          (this.loginForm.controls[field].dirty ||
            this.loginForm.controls[field].touched))) &&
      this.loginForm.controls[field].errors
    ) {
      return true;
    }
    return false;
  }

  public keyPressNumbers(w: any) {
    var charCode = w.which ? w.which : w.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 8) {
      w.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  fValidateOTP() {
    if (this.otpForm.valid) {
      this.isChecked = false;
    }
    if (
      this.isChecked &&
      this.otpForm.invalid &&
      (this.otpForm.touched || this.otpForm.dirty)
    ) {
      return true;
    }
    return false;
  }

  register() {
    this.router.navigate(['dsa/signup']);
    setTimeout(() => {
      location.reload();
    }, 600);
  }
}
