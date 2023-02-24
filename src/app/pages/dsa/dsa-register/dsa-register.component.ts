import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DsaService } from 'src/app/services/dsa.service';
import Validation from 'src/app/utils/confirm-passowrd';
import { loadScript } from 'src/app/utils/util';
declare var $: any;

@Component({
  selector: 'app-dsa-register',
  templateUrl: './dsa-register.component.html',
  styleUrls: ['./dsa-register.component.css'],
})
export class DsaRegisterComponent implements OnInit {
  maxDate: any;
  registerForm!: FormGroup;
  otpForm!: FormGroup;
  isChecked: boolean = false;
  orgList: any[] = [];
  profiles: any[] = [];
  sources: any[] = [];
  setups: any[] = [];
  states: any[] = [];

  products: any[] = [];
  banks: any[] = [];
  showPassword: boolean = false;
  userId: string =
    'eyJpdiI6IlpxUHgvcmsyMlRKWE4zSHhqRHdEc2c9PSIsInZhbHVlIjoiaWh1VC8ybEFWQnY3clIvNUZ4V210UT09IiwibWFjIjoiOTFlYWFlZTk1ODQ5ZTE2MWQzNDUzYjQxMmRhMjQ4MTUyZWMxMzNiNDE4M2VmZGQ5YWE3NDIyYWJjNzYyZjJiMSIsInRhZyI6IiJ9';
  sec: number = 60;
  searchTerm: any = null;
  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private dsa: DsaService
  ) {
    this.maxDate = this.getTodayDate();
  }

  ngOnInit() {
    loadScript();
    this.getSetups();
    this.getSources();
    this.getProducts();
    this.getprofiles();
    this.getBanks();
    this.getStates();
    // this.getOrg('');
    this.registerForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[a-zA-Z ]+$/),
            Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        role: ['dsa'],
        dob: ['', [Validators.required]],
        addressLine: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern(/^[0-9a-zA-Z-()/,.&: ]+$/),
            Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
          ],
        ],
        locality: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z-()/,.&: ]+$/),
          ],
        ],
        city: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z ]+$/),
          ],
        ],
        landmark: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
            Validators.pattern(/^[0-9a-zA-Z-()/,.&: ]+$/),
          ],
        ],
        state: [null, [Validators.required, Validators.pattern(/^[0-9 ]+$/)]],
        pincode: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
            Validators.pattern(/^([1-9]){1}([0-9]){5}?$/),
          ],
        ],
        pan: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/),
          ],
        ],
        dsa: ['', [Validators.required, Validators.minLength(4)]],
        profile: [null, [Validators.required]],
        product: [null, [Validators.required]],
        setup: [null, [Validators.required]],
        category: [''],
        source: [null, [Validators.required]],
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
        accountName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/[A-Za-z][A-Za-z]*$/),
            Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
          ],
        ],
        accountBank: [null, [Validators.required]],
        accountBranch: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/[A-Za-z][A-Za-z0-9]*$/),
            Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
          ],
        ],
        accountNumber: [
          '',
          [
            Validators.required,
            Validators.maxLength(16),
            Validators.minLength(8),
            Validators.pattern(/^[0-9]+$/),
          ],
        ],
        ifsc: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
            Validators.pattern(/^([A-Z]){4}([0]){1}([0-9A-Z]){6}?$/),
          ],
        ],
        gender: ['1', [Validators.required]],
        type: ['1', [Validators.required]],
        number: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^[0-9 ]+$/),
          ],
        ],
      },
      {
        // validators: [Validation.match('password', 'cPassword')],
      }
    );
  }

  register() {
    if (
      this.registerForm.invalid ||
      this.registerForm.controls['password'].value !==
        this.registerForm.controls['cPassword'].value
    ) {
      this.isChecked = true;
      console.error(this.registerForm.value);

      return;
    }
    console.log(this.registerForm.value);
    this.auth.Register(this.registerForm.value).subscribe((r) => {
      if (r.status) {
        this.isChecked = false;
        this.router.navigate(['dsa/login']);
        this.alert.fireToastS(r.message[0]);
      } else this.alert.fireToastF(r.message[0]);
    });
  }

  changeTextToUppercase(field: any) {
    const obj: any = {};
    obj[field] = this.registerForm.controls[field].value.toUpperCase();
    this.registerForm.patchValue(obj);
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
    if (charCode < 48 || charCode > 57) {
      w.preventDefault();
      return false;
    } else {
      return true;
    }
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

  login() {
    this.router.navigate(['dsa/login']).then(() => {
      location.reload();
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

  public togglePassword() {
    this.showPassword = !this.showPassword;
  }

  getprofiles() {
    this.dsa.getProfiles().subscribe((r: any) => {
      this.profiles = r.response.profiles;
      console.error(r);
    });
  }

  getSources() {
    this.dsa.getSources().subscribe((r: any) => {
      this.sources = r.response.sources;
      console.error(r);
    });
  }

  getSetups() {
    this.dsa.getSetups().subscribe((r: any) => {
      this.setups = r.response.setups;
      console.error(r);
    });
  }

  getProducts() {
    this.dsa.getProducts().subscribe((r: any) => {
      this.products = r.response.products;
      console.error(r);
    });
  }

  getBanks() {
    this.dsa.regGetBank().subscribe((r: any) => {
      this.banks = r.response.bankList;
      console.error(r);
    });
  }
  getStates() {
    this.dsa.getStates().subscribe((r: any) => {
      this.states = r.response.stateList;
      console.error(r);
    });
  }
  setCat(e: any) {
    this.registerForm.controls['category'].setValue(e.category);
    console.error(e);
  }
}
