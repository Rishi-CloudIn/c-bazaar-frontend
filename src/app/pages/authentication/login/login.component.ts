import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiCallService } from 'src/app/services/apiCall.service';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  otpForm!: FormGroup;
  isChecked: boolean = false;
  otpSented: boolean = false;
  otpWhatsapp: boolean = false;
  userId: string = '';
  count = 30;
  counterCount = 0;

  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    $('#name').focus();
    this.loginForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9 ]+$/),
        ],
      ],
    });
    this.setOtpForm();
  }

  setOtpForm() {
    this.otpForm = this.fb.group({
      d1: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      d2: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      d3: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      d4: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      d5: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      d6: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.isChecked = true;
      return;
    }
    this.auth.login(this.loginForm.value).subscribe((r) => {
      if (r.status) {
        this.alert.fireToastS(r.message[0]);
        this.otpSented = true;
        this.counter();
        this.isChecked = false;
        this.userId = r.response.userId;
        sessionStorage.setItem('userId', r.response.userId);
        console.log(r);
      }
    });
  }

  gLogin() {
    // this.validateLogin = false;
    this.auth.GoogleAuth();
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
  resentOtp() {
    this.auth.reSentOtp({ userId: this.userId }).subscribe((r) => {
      if (r.status) {
        this.otpWhatsapp = false;
        this.alert.fireToastS(r.message[0]);
        this.resetCounter();
        this.setOtpForm();
      } else this.alert.fireToastF(r.message[0]);
    });
  }
  resentOtpW() {
    this.auth
      .reSentOtp({ userId: this.userId, otpType: 'whatsApp' })
      .subscribe((r) => {
        if (r.status) {
          this.otpWhatsapp = true;
          this.resetCounter();
          this.setOtpForm();
          this.alert.fireToastS(r.message[0]);
        } else this.alert.fireToastF(r.message[0]);
      });
  }

  public keyPressNumbers(w: any) {
    var charCode = w.which ? w.which : w.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 8) {
      w.preventDefault();
      if (charCode > 95 && charCode < 105) {
        return true;
      } else return false;
    } else {
      return true;
    }
  }

  hideMobile() {
    let d1 = this.loginForm.controls['userName'].value.slice(0, 3);
    let d2 = this.loginForm.controls['userName'].value.slice(7, 10);
    let d3 = d1 + 'xxxx' + d2;
    return d3;
  }

  onDigitInput(event: any) {
    let element;
    if (event.code !== 'Backspace')
      element = event.srcElement.nextElementSibling;

    if (event.code === 'Backspace')
      element = event.srcElement.previousElementSibling;

    if (element == null) return;
    else element.focus();
  }

  validateOTP() {
    console.log(this.otpForm.value);
    let otp = '';
    otp = otp.concat(
      this.otpForm.controls['d1'].value,
      this.otpForm.controls['d2'].value,
      this.otpForm.controls['d3'].value,
      this.otpForm.controls['d4'].value,
      this.otpForm.controls['d5'].value,
      this.otpForm.controls['d6'].value
    );
    if (this.otpForm.invalid) {
      this.isChecked = true;
      return;
    } else this.isChecked = false;
    console.log(otp);
    // this.isChecked = true;
    let data = {
      otp: otp,
      userId: this.userId,
    };
    this.auth.verifyOtp(data).subscribe((r) => {
      this.alert.fireToastS(r.message[0]);
      sessionStorage.setItem('userId', r.response.userId);
      sessionStorage.setItem('accessToken', r.response.accessToken);
      this.router.navigate(['dashboard']);
      console.log(r);
    });
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
    this.router.navigate(['signup']);
    setTimeout(() => {
      location.reload();
    }, 600);
  }

  counter() {
    if (++this.counterCount > 31) {
      return;
    }
    setTimeout(() => {
      this.count = this.count - 1;
      this.counter();
    }, 1000);
  }

  resetCounter() {
    this.count = 30;
    this.counterCount = 0;
    this.counter();
  }

  edit() {
    this.otpSented = false;
    $('#name').focus();
  }
}
