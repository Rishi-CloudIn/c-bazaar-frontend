import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  dpUrl: string = '';
  personalData: any;
  isChecked: boolean = false;
  professionalData: any;
  edit: boolean = false;
  profileForm!: FormGroup;
  isLoading: boolean = true;
  name: string = '';
  pincode: string = '';
  organization: string = '';
  type: string = '';
  amount: string = '';
  orgList: any[] = [];
  file: any;
  email: string = '';
  onBoarded: boolean = false;
  constructor(
    private cs: CommonService,
    private alert: AlertService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.getProfile();
    this.getOrg('');

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
      email: ['', [Validators.required, Validators.email]],
      pincode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern(/^([1-9]){1}([0-9]){5}?$/),
        ],
      ],
      organizationId: ['', [Validators.required, Validators.minLength(3)]],
      income: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getProfile() {
    this.cs.getProfile().subscribe((r: any) => {
      this.personalData = r.response.userData.personalData;
      this.professionalData = r.response.userData.professionalData;
      this.dpUrl = r.response.userData.profileUrl;
      this.setProfile(r.response);
      this.isLoading = false;
      this.onBoarded = r.response.onBoarded;
      console.log(r);
    });
  }

  setProfile(data: any) {
    this.name = data.userData.personalData.name;
    this.pincode = data.userData.personalData.pincode;
    this.email = data.userData.personalData.email;
    this.amount = data.userData.professionalData.income;
    this.type = data.userData.professionalData.type.value;
    this.organization = data.userData.professionalData.organizationName;

    // const entries = Object.entries(data.userData.personalData);
    // for (let i = 0; i < entries.length; i++) {
    //   console.error(entries[i][0]);
    //   if (entries[i][0] !== 'stateName') {
    //     this.profileForm.controls[entries[i][0]].setValue(entries[i][1]);
    //   }
    // }

    // const entries2 = Object.entries(data.userData.professionalData);
    // for (let i = 0; i < entries2.length; i++) {
    //   console.error(entries2[i][0]);
    //   if (entries2[i][0] !== 'organizationName') {
    //     this.profileForm.controls[entries2[i][0]].setValue(entries2[i][1]);
    //   }
    // }
  }

  enableEdit() {
    this.edit = true;
    $('#name').focus();
  }

  submit() {
    if (this.profileForm.invalid) {
      this.isChecked = true;
      return;
    }
    let data = {
      name: this.name,
      pincode: this.pincode,
      type: this.type,
      income: this.amount,
      organizationName: this.organization,
      email: this.email,
    };
    this.cs.updateProfile(data).subscribe((r: any) => {
      if (r.status) {
        this.alert.fireToastS(r.message[0]);
        this.edit = false;
        this.getProfile();
      }
    });
    console.log(data);
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

  public keyPressNumbers(w: any) {
    var charCode = w.which ? w.which : w.keyCode;
    if (charCode < 48 || charCode > 57) {
      w.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
