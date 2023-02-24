import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { DsaService } from 'src/app/services/dsa.service';
import Validation from 'src/app/utils/confirm-passowrd';
declare var $: any;

@Component({
  selector: 'app-dsa-profile',
  templateUrl: './dsa-profile.component.html',
  styleUrls: ['./dsa-profile.component.css'],
})
export class DsaProfileComponent implements OnInit {
  dpUrl: string = '';
  personalData: any;
  isChecked: boolean = false;
  professionalData: any;
  edit: boolean = false;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = true;
  name: string = '';
  pincode: string = '';
  organization: string = '';
  type: string = '';
  amount: string = '';
  orgList: any[] = [];
  profiles: any[] = [];
  sources: any[] = [];
  setups: any[] = [];
  states: any[] = [];
  products: any[] = [];
  banks: any[] = [];
  file: any;
  email: string = '';

  constructor(
    private cs: CommonService,
    private alert: AlertService,
    private fb: FormBuilder,
    private dsa: DsaService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.getOrg('');
    this.getSetups();
    this.getSources();
    this.getProducts();
    this.getprofiles();
    this.getBanks();
    this.getStates();

    this.profileForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z ]+$/),
          Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
        ],
      ],
      mobileNumber: [],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]],
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
      panCard: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/),
        ],
      ],
      dsa: ['', [Validators.required]],
      profile: [null, [Validators.required]],
      productType: [null, [Validators.required]],
      setup: [null, [Validators.required]],
      productCategory: ['', [Validators.required]],
      source: [null, [Validators.required]],
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
    });
    this.initPasswordForm();
    this.getProfile();
  }

  initPasswordForm() {
    this.passwordForm = this.fb.group(
      {
        requestFrom: ['web'],
        requestType: ['changePassword'],
        oldPassword: ['', [Validators.required, Validators.minLength(8)]],
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
        validators: [
          Validation.match('password', 'cPassword'),
          // Validation.unMatch("oldPassword", "password"),
        ],
      }
    );
  }

  getProfile() {
    this.dsa.getProfile().subscribe((r: any) => {
      this.personalData = r.response.userData.personalData;
      this.professionalData = r.response.userData.professionalData;
      this.dpUrl = r.response.userData.profileUrl;
      this.setProfile(r.response);
      this.isLoading = false;
    });
  }

  setProfile(data: any) {
    // this.name = data.userData.personalData.name;
    // this.pincode = data.userData.personalData.pincode;
    // this.email = data.userData.personalData.email;
    // this.amount = data.userData.professionalData.income;
    // this.type = data.userData.professionalData.type.value;
    // this.organization = data.userData.professionalData.organizationName;

    const entries = Object.entries(data.userData.personalData);
    for (let i = 0; i < entries.length; i++) {
      // console.error(entries[i][0]);
      if (
        entries[i][0] !== 'stateName' &&
        entries[i][0] !== 'genderName' &&
        entries[i][0] !== 'profileName' &&
        entries[i][0] !== 'setupName' &&
        entries[i][0] !== 'product' &&
        entries[i][0] !== 'sourceName' &&
        entries[i][0] !== 'accountBankName'
      ) {
        this.profileForm.controls[entries[i][0]].setValue(entries[i][1]);
      }
    }
  }
  setData(data: any) {}

  enableEdit() {
    this.edit = true;
    $('#name').focus();
  }

  submit() {
    if (this.profileForm.invalid) {
      this.isChecked = true;
      return;
    }
    this.dsa.updateProfile(this.profileForm.value).subscribe((r: any) => {
      if (r.status) {
        this.alert.fireToastS(r.message[0]);
        this.edit = false;
        this.getProfile();
      }
    });
    // console.log(data);
  }

  validateLogin(field: any) {
    if (this.isChecked && this.profileForm.controls[field].invalid) {
      return true;
    }
    return false;
  }

  getOrg(search: string) {
    let data = {
      search: search,
      page: 1,
    };
    this.auth.getOrgName(data).subscribe((r: any) => {
      console.log(r);
      this.orgList = r.response.organizationList;
    });
  }

  openFile() {
    $('#file').click(function () {
      $('#filesrc').trigger('click');
    });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.upload();
  }

  upload() {
    const formData = new FormData();
    formData.append('creditBazaarDocument', this.file);
    this.cs.upload(formData).subscribe((r) => {
      console.log(r);
      if (r.status) {
        let data = {
          profileUrl: r.response.url,
        };
        this.cs.updateProfile(data).subscribe((r: any) => {
          if (r.status) {
            this.alert.fireToastS(r.message[0]);
            this.getProfile();
          }
        });
        return r;
      }
    });
  }

  getprofiles() {
    this.dsa.getProfiles().subscribe((r: any) => {
      this.profiles = r.response.profiles;
    });
  }

  getSources() {
    this.dsa.getSources().subscribe((r: any) => {
      this.sources = r.response.sources;
    });
  }

  getSetups() {
    this.dsa.getSetups().subscribe((r: any) => {
      this.setups = r.response.setups;
    });
  }

  getProducts() {
    this.dsa.getProducts().subscribe((r: any) => {
      this.products = r.response.products;
    });
  }
  getBanks() {
    this.dsa.regGetBank().subscribe((r: any) => {
      this.banks = r.response.bankList;
    });
  }
  getStates() {
    this.dsa.getStates().subscribe((r: any) => {
      this.states = r.response.stateList;
    });
  }
  validateProfile(field: any) {
    if (
      ((this.isChecked && this.profileForm.controls[field].invalid) ||
        (this.profileForm.controls[field].invalid &&
          (this.profileForm.controls[field].dirty ||
            this.profileForm.controls[field].touched))) &&
      this.profileForm.controls[field].errors
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
  public togglePassword() {
    this.showPassword = !this.showPassword;
  }

  resetPasswordForm() {
    this.isChecked = false;
    this.initPasswordForm();
  }

  changePwd() {
    if (this.passwordForm.invalid) {
      this.isChecked = true;
      return;
    }
    this.dsa.dsaChangePws(this.passwordForm.value).subscribe((r: any) => {
      this.alert.fireToastS(r.message[0]);
      $('#passwordModal').modal('hide');
      this.isChecked = false;
    });
  }

  enterPassword() {
    console.error(
      this.passwordForm.controls["password"].value,
      this.passwordForm.controls["cPassword"].value
    );
    this.passwordForm.valueChanges.subscribe();
    this.passwordForm.controls["password"].setValue(
      this.passwordForm.controls["password"].value
    );
    this.passwordForm.controls["cPassword"].setValue(
      this.passwordForm.controls["cPassword"].value
    );
    this.passwordForm.controls["oldPassword"].setValue(
      this.passwordForm.controls["oldPassword"].value
    );
  }
}
