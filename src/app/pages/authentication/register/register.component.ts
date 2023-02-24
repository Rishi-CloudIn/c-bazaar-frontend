import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeInterval } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { loadScript } from 'src/app/utils/util';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  otpForm!: FormGroup;
  isChecked: boolean = false;
  otpSented: boolean = false;
  otpWhatsapp: boolean = false;
  orgList: any[] = [];
  userId: string =
    'eyJpdiI6IlpxUHgvcmsyMlRKWE4zSHhqRHdEc2c9PSIsInZhbHVlIjoiaWh1VC8ybEFWQnY3clIvNUZ4V210UT09IiwibWFjIjoiOTFlYWFlZTk1ODQ5ZTE2MWQzNDUzYjQxMmRhMjQ4MTUyZWMxMzNiNDE4M2VmZGQ5YWE3NDIyYWJjNzYyZjJiMSIsInRhZyI6IiJ9';
  count = 30;
  counterCount = 0;
  searchTerm: any = null;
  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    loadScript();
    this.getOrg('', 'init');
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
          Validators.minLength(3),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      role: ['customer'],
      gender: ['1', [Validators.required]],
      type: ['1', [Validators.required]],
      companyName: [null, [Validators.required, Validators.minLength(3)]],
      amount: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.minLength(3),
        ],
      ],
      number: [
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

  register() {
    if (this.registerForm.invalid) {
      this.isChecked = true;
      return;
    }
    this.auth.Register(this.registerForm.value).subscribe((r) => {
      if (r.status) {
        this.otpSented = true;
        this.isChecked = false;
        this.counter();
        this.userId = r.response.userId;
        sessionStorage.setItem('userId', r.response.userId);
        this.alert.fireToastS(r.message[0]);
      } else this.alert.fireToastF(r.message[0]);

      // console.error(r);
    });
  }

  verifyOtp() {
    let otp = '';
    if (this.otpForm.invalid) {
      this.isChecked = true;
      otp = otp.concat(
        this.otpForm.controls['d1'].value,
        this.otpForm.controls['d2'].value,
        this.otpForm.controls['d3'].value,
        this.otpForm.controls['d4'].value,
        this.otpForm.controls['d5'].value,
        this.otpForm.controls['d6'].value
      );
      return;
    } else this.isChecked = false;
    this.auth.verifyOtp(this.registerForm.value).subscribe((r) => {
      if (r.status) {
        this.router.navigate(['home']);
      }
    });
  }

  resentOtp() {
    this.auth.reSentOtp({ userId: this.userId }).subscribe((r) => {
      if (r.status) {
        this.otpWhatsapp = false;
        this.resetCounter();
        this.setOtpForm();
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
          this.resetCounter();
          this.setOtpForm();
          this.alert.fireToastS(r.message[0]);
        } else this.alert.fireToastF(r.message[0]);
      });
  }

  validateRegister(field: any) {
    if (
      ((this.isChecked && this.registerForm.controls[field].invalid) ||
        (this.registerForm.controls[field].invalid &&
          (this.registerForm.controls[field].dirty ||
            this.registerForm.controls[field].touched))) &&
      this.registerForm.controls[field].errors
    ) {
      return true;
    }
    return false;
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

  getOrg(search: string, type: string) {
    let data = {
      search: search,
      page: 1,
    };
    this.auth.getOrgName(data).subscribe((r: any) => {
      console.log(r);
      if (type == 'search') {
        this.orgList = r.response.organizationList;
      } else this.orgList = this.orgList.concat(r.response.organizationList);
    });
  }

  hideMobile() {
    let d1 = this.registerForm.controls['number'].value.slice(0, 3);
    let d2 = this.registerForm.controls['number'].value.slice(7, 10);
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
  countDown() {
    // for (let i = 0; i <= 60; i++) {
    //   setTimeout(() => {}, 1000);
    // }
  }
  login() {
    this.router.navigate(['login']);
    setTimeout(() => {
      location.reload();
    }, 700);
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
  }
}
