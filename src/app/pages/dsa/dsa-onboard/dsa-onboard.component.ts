import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DsaService } from 'src/app/services/dsa.service';
import { ProfileService } from 'src/app/services/profile.service';
declare var $: any;

@Component({
  selector: 'app-dsa-onboard',
  templateUrl: './dsa-onboard.component.html',
  styleUrls: ['./dsa-onboard.component.css'],
})
export class DsaOnboardComponent implements OnInit {
  onboardForm!: FormGroup;
  maxDate: any;

  isChecked: boolean = false;
  name: string = '';
  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private ps: ProfileService,
    private dsa: DsaService
  ) {
    this.maxDate = this.getTodayDate();
  }

  ngOnInit() {
    $('#panNumber').focus();
    this.name = this.ps.name;
    this.onboardForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      number: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      panNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/),
        ],
      ],
      dob: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          // Validators.pattern(
          //   /^([0-3]){1}([0-9]){1}([-]){1}([0-1]){1}([0-9]){1}([-]){1}([1-2]){1}([9,0]){1}([0-9]){1}([0-9]){1}?$/
          // ),
        ],
      ],
      pincode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern(/^([1-9]){1}([0-9]){5}?$/),
        ],
      ],
      gender: ['', [Validators.required]],
    });
  }

  validateOnboard(field: any) {
    if (
      ((this.isChecked && this.onboardForm.controls[field].invalid) ||
        (this.onboardForm.controls[field].invalid &&
          (this.onboardForm.controls[field].dirty ||
            this.onboardForm.controls[field].touched))) &&
      this.onboardForm.controls[field].errors
    ) {
      return true;
    }
    return false;
  }

  changeTextToUppercase(field: any) {
    const obj: any = {};
    obj[field] = this.onboardForm.controls[field].value.toUpperCase();
    this.onboardForm.patchValue(obj);
  }
  dateFormat(field: any, w: any) {
    var charCode = w.which ? w.which : w.keyCode;
    if (charCode < 48 || charCode > 57) {
      w.preventDefault();
      return false;
    } else {
      const obj: any = {};
      let data = this.onboardForm.controls[field].value;
      if (data.length == 3) {
        obj[field] = data.slice(0, 2) + '-' + data.slice(2, 3);
      } else if (data.length == 5)
        obj[field] =
          data.slice(0, 2) + '-' + data.slice(3, 5) + '-' + data.slice(5, 6);
      this.onboardForm.patchValue(obj);
    }
    return;
  }
  public keyPressNumbers(w: any) {
    var charCode = w.which ? w.which : w.keyCode;
    if (charCode < 48 || charCode > 57) {
      w.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  submit() {
    if (this.onboardForm.invalid) {
      this.isChecked = true;
      console.error(this.onboardForm.value);
      return;
    }
    this.dsa.dsaOnboard(this.onboardForm.value).subscribe((r: any) => {
      if (r.status) {
        // sessionStorage.setItem('userId', r.response.userId);
        this.router.navigate(['dsa/offers/' + r.response.cibilId]);
        // this.alert.fireToastS(r.message[0]);
      } else this.alert.fireToastF(r.message[0]);
    });
  }

  getTodayDate(): string {
    let date = new Date();
    date.setUTCDate(date.getUTCDate());
    let d: string[] = date.toLocaleDateString().split('/').reverse();
    d[0] = (Number(d[0]) - 18).toString();
    console.error(d);
    return d
      .concat(
        d
          .splice(1, 2)
          .reverse()
          .map((d) => (d.length == 1 ? '0' + d : d))
      )
      .join('-');
  }
}
