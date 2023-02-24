import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiCallService } from 'src/app/services/apiCall.service';
import { AuthService } from 'src/app/services/auth.service';
import { DsaService } from 'src/app/services/dsa.service';
import Validation from 'src/app/utils/confirm-passowrd';
declare var $: any;

@Component({
  selector: 'app-dsa-forgot-password',
  templateUrl: './dsa-forgot-password.component.html',
  styleUrls: ['./dsa-forgot-password.component.css'],
})
export class DsaForgotPasswordComponent implements OnInit {
  loginForm!: FormGroup;
  otpForm!: FormGroup;
  passwordForm!: FormGroup;

  isChecked: boolean = false;
  otpSented: boolean = false;
  otpWhatsapp: boolean = false;
  userId: string = '';
  showPassword: boolean = false;

  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private dsa: DsaService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    $('#name').focus();
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
    });
    this.otpForm = this.fb.group({
      d1: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      d2: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      d3: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      d4: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      d5: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      d6: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
    this.passwordForm = this.fb.group(
      {
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
        cPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
      },
      {
        validators: [Validation.match('password', 'cPassword')],
      }
    );
  }

  sendPassword() {
    if (this.loginForm.invalid) {
      this.isChecked = true;
      return;
    }
    this.dsa.forgotPassword(this.loginForm.value).subscribe((r: any) => {
      if (r.status) {
        this.alert.fireToastS(r.message[0]);
        this.otpSented = true;
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
    this.dsa.resendOTP({ userId: this.userId }).subscribe((r: any) => {
      if (r.status) {
        this.otpWhatsapp = false;
        this.alert.fireToastS(r.message[0]);
      } else this.alert.fireToastF(r.message[0]);
    });
  }

  resentOtpW() {
    this.auth
      .reSentOtp({ userId: this.userId, otpType: 'whatsApp' })
      .subscribe((r) => {
        if (r.status) {
          this.otpWhatsapp = true;
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

  hideMail() {
    // this.email = this.email;
    var hiddenEmail = this.loginForm.controls['userName'].value.replace(
      /(.{2})(.*)(?=@)/,
      function (gp1: any, gp2: any, gp3: any) {
        for (let i = 0; i < gp3.length; i++) {
          gp2 += '*';
        }
        return gp2;
      }
    );
    return hiddenEmail;
  }
  public togglePassword() {
    this.showPassword = !this.showPassword;
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
    if (this.otpForm.invalid && this.passwordForm.valid) {
      this.isChecked = true;
      return;
    } else this.isChecked = false;
    console.log(otp);
    // this.isChecked = true;
    let data = {
      otp: otp,
      userId: this.userId,
      password: this.passwordForm.controls['password'].value,
    };
    this.dsa.updatePassword(data).subscribe((r: any) => {
      this.alert.fireToastS(r.message[0]);
      // sessionStorage.setItem('userId', r.response.userId);
      // sessionStorage.setItem('accessToken', r.response.accessToken);
      this.router.navigate(['dsa/login']);
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

  validatePassword(field: any) {
    if (
      ((this.isChecked && this.passwordForm.controls[field].invalid) ||
        (this.passwordForm.controls[field].invalid &&
          (this.passwordForm.controls[field].dirty ||
            this.passwordForm.controls[field].touched))) &&
      this.passwordForm.controls[field].errors
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
}
