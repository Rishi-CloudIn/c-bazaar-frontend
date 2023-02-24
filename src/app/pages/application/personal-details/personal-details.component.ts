import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
declare var $: any;

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
})
export class PersonalDetailsComponent implements OnInit {
  id: string = '';
  tempId: string = '';
  loanType: string = '';
  data: any;
  educationDetail: boolean = false;
  type: string = '';
  isLoading: boolean = true;
  cpyAdd: boolean = true;
  stateList: any[] = [];
  sectorList: any[] = [];
  requestedAmount: any = '';
  loanTerm: any = '';
  termAccepted: boolean = true;
  quotedAmount: any = '';
  vehicleType: any = '';
  orgTypeList: any[] = [];
  ugCourses: any[] = [];
  pgCourses: any[] = [];
  maxDate: any;
  orgList: any[] = [];
  orgType: any;
  sectorType: any;
  homeStatus: any[] = [
    { name: 'Rental', value: 1 },
    { name: 'Owned', value: 2 },
    { name: 'Parental', value: 3 },
    { name: 'Comapny Provided', value: 4 },
  ];
  nationality: any[] = [
    { name: 'Indian', value: 1 },
    { name: 'Others', value: 2 },
  ];
  relation: any[] = [
    { name: 'Father', value: 'Father' },
    { name: 'Mother', value: 'Mother' },
    { name: 'Spouse', value: 'Spouse' },
    { name: 'Guardian', value: 'Guardian' },
  ];
  personalDetailsForm!: FormGroup;
  isChecked: boolean = false;

  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private app: LoanApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.maxDate = this.getTodayDate();
  }

  ngOnInit() {
    console.error(this.maxDate);
    this.getOrg('');
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.personalDetailsForm = this.fb.group({
      term: [false],
      educationDetail: [this.educationDetail, [Validators.required]],
      tempId: [this.tempId, [Validators.required]],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      communicationAddressLine: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^[0-9a-zA-Z-()/,.&: ]+$/),
        ],
      ],
      communicationLocality: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z-()/,.&: ]+$/),
        ],
      ],
      communicationCity: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      communicationLandmark: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.pattern(/^[0-9a-zA-Z-()/,.&: ]+$/),
        ],
      ],
      communicationState: [
        null,
        [Validators.required, Validators.pattern(/^[0-9 ]+$/)],
      ],
      communicationPincode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern(/^([1-9]){1}([0-9]){5}?$/),
        ],
      ],
      permanentAddressLine: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[0-9a-zA-Z-()/,.&: ]+$/),
        ],
      ],
      permanentRequired: [false, [Validators.required]],
      permanentLocality: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z-()/,.&: ]+$/),
        ],
      ],
      permanentCity: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      permanentLandmark: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.pattern(/^[0-9a-zA-Z-()/,.&: ]+$/),
        ],
      ],
      permanentState: [
        null,
        [Validators.required, Validators.pattern(/^[0-9 ]+$/)],
      ],
      permanentPincode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern(/^([1-9]){1}([0-9]){5}?$/),
        ],
      ],
      homeStatus: [
        'null',
        [Validators.required, Validators.pattern(/^[0-9 ]+$/)],
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
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(50),
          Validators.email,
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
      gender: ['null', [Validators.required, Validators.pattern(/^[0-9 ]+$/)]],
      nationality: [
        null,
        [Validators.required, Validators.pattern(/^[0-9a-zA-Z ]+$/)],
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
      aadhar: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      occupationType: ['', [Validators.required]],
      organizationType: [
        'null',
        [Validators.required, Validators.pattern(/^[0-9 ]+$/)],
      ],
      organizationSector: [
        'null',
        [Validators.required, Validators.pattern(/^[0-9-& ]+$/)],
      ],
      organizationName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      income: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9.,. ]+$/),
        ],
      ],
      startDate: [
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
      employeeId: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      designation: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      experience: [
        '',
        [
          Validators.required,
          Validators.max(70),
          Validators.min(0.1),
          Validators.pattern(/^(\d+)?([.]?\d{0,1})?$/),
        ],
      ],
      gst: ['', []],
      companyNumber: ['', []],
      registeredAddressLine: ['', []],
      registeredLocality: ['', []],
      registeredCity: ['', []],
      registeredLandmark: ['', []],
      registeredState: ['', []],
      registeredPincode: ['', []],
      goldDetails: [''],
      karat: [''],
      nomineeName: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      nomineeRelation: [0, [Validators.minLength(3), Validators.maxLength(20)]],
      nomineeOccupationType: ['null'],
      nomineeIncome: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9.,. ]+$/),
        ],
      ],
      nomineeOccupation: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      nomineeNumber: [
        '',
        [
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9 ]+$/),
        ],
      ],
      nomineePan: [
        '',
        [
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/),
        ],
      ],
      nomineeAadhar: [
        '',
        [
          Validators.minLength(12),
          Validators.maxLength(12),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      hscName: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      hscYear: [
        '',
        [
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      sslcName: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      sslcYear: [
        '',
        [
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      collegeName: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      collegeJoiningDate: [''],
      courseName: ['null'],
      courseDuration: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(1),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      pgCourse: [false],
      pgCollegeName: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      pgCourseName: ['null'],
      pgCollegeJoiningDate: [''],
      pgCourseDuration: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(1),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
    });
    this.getDetails();
    this.getStates();

    // this.getOrgSector();
    // this.getOrgType();
    // this.getPersonalDetails();
  }
  getDetails() {
    let body = {
      offerId: this.id,
    };

    this.app.applicationResolver(body).subscribe((r: any) => {
      console.log(r);
      this.tempId = r.response.tempId;
      this.requestedAmount = r.response.requestedAmount;
      this.quotedAmount = r.response.quotedAmount;
      this.vehicleType = r.response.vehicleType;
      this.loanTerm = r.response.loanTerm;
      this.loanType = r.response.type;
      if (r.response.type == 'Education Loan') {
        this.educationDetail = true;
      }

      for (let i = 0; i < r.response.data.length; i++) {
        if (r.response.data[i].step == 'step 2') {
          this.data = r.response.data[i];
        }
      }
      this.getPersonalDetails(r.response.tempId);
      this.isLoading = false;
    });
  }

  // changeTextToUppercase(field: any) {
  //   const obj: any = {};
  //   obj[field] = this.onboardForm.controls[field].value.toUpperCase();
  //   this.onboardForm.patchValue(obj);
  // }

  getPersonalDetails(id: string) {
    this.init();
    let body: any = {
      offerId: this.id,
      requestedAmount: this.requestedAmount,
      loanTerm: this.loanTerm,
      vehicleType: this.vehicleType,
      quotedAmount: this.quotedAmount,
      educationDetail: this.educationDetail,
    };
    if (id !== '') {
      body.tempId = id;
    }
    this.app.applicationPersonalDetails(body).subscribe((r: any) => {
      console.log(r);
      if (r.response.savedData) {
        this.setData(r.response.personalData);
      } else this.setData(r.response.userDetails);
    });
  }

  validateLogin(field: any) {
    if (
      ((this.isChecked && this.personalDetailsForm.controls[field].invalid) ||
        (this.personalDetailsForm.controls[field].invalid &&
          (this.personalDetailsForm.controls[field].dirty ||
            this.personalDetailsForm.controls[field].touched))) &&
      this.personalDetailsForm.controls[field].errors
    ) {
      return true;
    }
    return false;
  }

  submit() {
    if (this.personalDetailsForm.controls['occupationType'].value == '2') {
      this.personalDetailsForm.controls['experience'].setValue('4');
      this.personalDetailsForm.controls['employeeId'].setValue('Ddf2sfsdf');
      this.personalDetailsForm.controls['designation'].setValue('Dev');
    }

    this.personalDetailsForm.controls['tempId'].setValue(this.tempId);
    if (
      this.personalDetailsForm.invalid ||
      this.personalDetailsForm.controls['term'].value === false
    ) {
      this.isChecked = true;
      this.alert.fireToastS('Please Check Your Inputs');
      console.error(this.personalDetailsForm.value);
      console.error(this.personalDetailsForm);

      return;
    }

    this.app
      .savePersonalData(this.personalDetailsForm.value)
      .subscribe((r: any) => {
        console.log(r);
        $('#confirm').modal('hide');

        if (r.response.onHold) {
          $('#homeLoan').modal('show');
        } else {
          this.alert.fireToastS(r.message[0]);

          this.router.navigate(['/offer/application/personal_docs/' + this.id]);
        }
      });
    // console.log(this.personalDetailsForm.value);
  }

  closeHomeLoanPop() {
    $('#homeLoan').modal('hide');
    this.router.navigate(['/dashboard']);
    return;
  }

  confirmPop() {
    if (this.personalDetailsForm.controls['occupationType'].value == '2') {
      this.personalDetailsForm.controls['experience'].setValue('4');
      this.personalDetailsForm.controls['employeeId'].setValue('Ddf2sfsdf');
      this.personalDetailsForm.controls['designation'].setValue('Dev');
    }

    this.personalDetailsForm.controls['tempId'].setValue(this.tempId);
    if (
      this.personalDetailsForm.invalid ||
      this.personalDetailsForm.controls['term'].value === false
    ) {
      this.isChecked = true;
      this.alert.fireToastF('Please Enter Valid Inputs');
      console.error(this.personalDetailsForm.value);
      console.error(this.personalDetailsForm);

      return;
    }
    $('#confirm').modal('show');
  }

  getStates() {
    this.app.getStates().subscribe((r: any) => {
      console.log(r);
      this.stateList = r.response.stateList;
    });
  }

  getOrgType() {
    this.personalDetailsForm.controls['organizationType'].setValue('null'),
      this.app
        .getOrgType({
          occupationType:
            this.personalDetailsForm.controls['occupationType'].value,
        })
        .subscribe((r: any) => {
          console.log(r);
          this.orgTypeList = r.response.organizationTypeList;
          // this.getOrgSector(
          //   this.personalDetailsForm.controls['organizationType'].value
          // );
        });
  }

  getOrgSector() {
    if (this.personalDetailsForm.controls['organizationType'].value == 'null') {
      return;
    }
    this.app
      .getOrgSector({
        organizationType:
          this.personalDetailsForm.controls['organizationType'].value,
      })
      .subscribe((r: any) => {
        console.log(r);
        this.sectorList = r.response.organizationSector;
      });
  }

  setData(data: any) {
    const entries = Object.entries(data);
    console.error(entries);
    for (let i = 0; i < entries.length; i++) {
      if (
        entries[i][0] !== 'genderName' &&
        entries[i][0] !== 'occupationTypeName' &&
        entries[i][0] !== 'pincode' &&
        entries[i][0] !== 'organizationTypeName' &&
        entries[i][0] !== 'homeStatusName' &&
        entries[i][0] !== 'nationalityName' &&
        entries[i][0] !== 'organizationSectorName' &&
        entries[i][0] !== 'permanentStateName' &&
        entries[i][0] !== 'communicationStateName' &&
        entries[i][0] !== 'registeredStateName'
      ) {
        this.personalDetailsForm.controls[entries[i][0]].setValue(
          entries[i][1]
        );
        if (entries[i][0] == 'startDate') {
          var date: string = entries[i][1] as string;
          this.personalDetailsForm.controls[entries[i][0]].setValue(
            date.split('-').reverse().join('-')
          );
        }
      } else if (entries[i][0] !== 'organizationType') {
        // this.orgType = entries[i][1];
        // this.getOrgType();
      }

      // console.error(entries[i][0], entries[i][1]);
    }
    // console.error(entries);
  }

  changeTextToUppercase(field: any) {
    const obj: any = {};
    obj[field] = this.personalDetailsForm.controls[field].value.toUpperCase();
    this.personalDetailsForm.patchValue(obj);
  }

  dateFormat(field: any, w: any) {
    var charCode = w.which ? w.which : w.keyCode;
    if (charCode < 48 || charCode > 57) {
      w.preventDefault();
      return false;
    } else {
      const obj: any = {};
      let data = this.personalDetailsForm.controls[field].value;
      if (data.length == 2) {
        obj[field] = data.slice(0, 3) + '-' + data.slice(2, 3);
      } else if (data.length == 5)
        obj[field] =
          data.slice(0, 2) + '-' + data.slice(3, 5) + '-' + data.slice(5, 6);
      this.personalDetailsForm.patchValue(obj);
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

  addressChange(type: number) {
    if (this.personalDetailsForm.controls['permanentRequired'].value) {
      if (type == 1) {
        this.personalDetailsForm.controls['permanentAddressLine'].setValue(
          this.personalDetailsForm.controls['communicationAddressLine'].value
        );
        this.personalDetailsForm.controls['permanentLandmark'].setValue(
          this.personalDetailsForm.controls['communicationLandmark'].value
        );
        this.personalDetailsForm.controls['permanentLocality'].setValue(
          this.personalDetailsForm.controls['communicationLocality'].value
        );
        this.personalDetailsForm.controls['permanentCity'].setValue(
          this.personalDetailsForm.controls['communicationCity'].value
        );
        this.personalDetailsForm.controls['permanentPincode'].setValue(
          this.personalDetailsForm.controls['communicationPincode'].value
        );
        this.personalDetailsForm.controls['permanentState'].setValue(
          this.personalDetailsForm.controls['communicationState'].value
        );
      } else {
        this.personalDetailsForm.controls['communicationAddressLine'].setValue(
          this.personalDetailsForm.controls['permanentAddressLine'].value
        );
        this.personalDetailsForm.controls['communicationLocality'].setValue(
          this.personalDetailsForm.controls['permanentLocality'].value
        );
        this.personalDetailsForm.controls['communicationCity'].setValue(
          this.personalDetailsForm.controls['permanentCity'].value
        );
        this.personalDetailsForm.controls['communicationPincode'].setValue(
          this.personalDetailsForm.controls['permanentPincode'].value
        );
        this.personalDetailsForm.controls['communicationState'].setValue(
          this.personalDetailsForm.controls['permanentState'].value
        );
        this.personalDetailsForm.controls['communicationLandmark'].setValue(
          this.personalDetailsForm.controls['permanentLandmark'].value
        );
      }
    }
  }

  init() {
    this.app
      .getOrgType({
        occupationType: 'all',
      })
      .subscribe((r: any) => {
        this.orgTypeList = r.response.organizationTypeList;
        console.error(this.orgTypeList);
      });

    this.app
      .getOrgSector({
        organizationType: 'all',
      })
      .subscribe((r: any) => {
        this.sectorList = r.response.organizationSector;
        console.error(r);
      });

    this.setFormValidation();
  }

  loanForm(type: any, r: any) {
    switch (type) {
      case 'Credit Card':
        break;

      case 'Home Loan':
        // this.commonFB(r);
        break;

      case 'Vehicle Loan':
        // this.vehicleFB(r);
        break;

      case 'Personal Loan':
        // this.commonFB(r);
        break;

      case 'Business Loan':
        // this.commonFB(r);
        break;

      case 'Gold Loan':
        // this.commonFB(r);
        break;

      case 'Education Loan':
        // this.commonFB(r);
        break;

      default:
    }
  }

  // initCC() {
  //   if (this.type == 'Salaried') {
  //     this.personalDetailsForm = this.fb.group({
  //       tempId: [this.tempId, [Validators.required]],
  //       name: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(3),
  //           Validators.maxLength(100),
  //           Validators.pattern(/^[a-zA-Z ]+$/),
  //         ],
  //       ],
  //       communicationAddressLine: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(3),
  //           Validators.maxLength(100),
  //           Validators.pattern(/^[0-9a-zA-Z-()/,.&: ]+$/),
  //         ],
  //       ],
  //       communicationLocality: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(5),
  //           Validators.maxLength(50),
  //           Validators.pattern(/^[a-zA-Z-()/,.&: ]+$/),
  //         ],
  //       ],
  //       communicationCity: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(5),
  //           Validators.maxLength(50),
  //           Validators.pattern(/^[a-zA-Z ]+$/),
  //         ],
  //       ],
  //       communicationLandmark: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(5),
  //           Validators.maxLength(100),
  //           Validators.pattern(/^[0-9a-zA-Z-()/,.&: ]+$/),
  //         ],
  //       ],
  //       communicationState: [
  //         null,
  //         [Validators.required, Validators.pattern(/^[0-9 ]+$/)],
  //       ],
  //       communicationPincode: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(6),
  //           Validators.maxLength(6),
  //           Validators.pattern(/^([1-9]){1}([0-9]){5}?$/),
  //         ],
  //       ],
  //       permanentAddressLine: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(3),
  //           Validators.maxLength(50),
  //           Validators.pattern(/^[0-9a-zA-Z-()/,.&: ]+$/),
  //         ],
  //       ],
  //       permanentRequired: [false, [Validators.required]],
  //       permanentLocality: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(5),
  //           Validators.maxLength(50),
  //           Validators.pattern(/^[a-zA-Z-()/,.&: ]+$/),
  //         ],
  //       ],
  //       permanentCity: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(5),
  //           Validators.maxLength(50),
  //           Validators.pattern(/^[a-zA-Z ]+$/),
  //         ],
  //       ],
  //       permanentLandmark: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(5),
  //           Validators.maxLength(100),
  //           Validators.pattern(/^[0-9a-zA-Z-()/,.&: ]+$/),
  //         ],
  //       ],
  //       permanentState: [
  //         null,
  //         [Validators.required, Validators.pattern(/^[0-9 ]+$/)],
  //       ],
  //       permanentPincode: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(6),
  //           Validators.maxLength(6),
  //           Validators.pattern(/^([1-9]){1}([0-9]){5}?$/),
  //         ],
  //       ],
  //       homeStatus: [
  //         'null',
  //         [Validators.required, Validators.pattern(/^[0-9 ]+$/)],
  //       ],
  //       number: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(10),
  //           Validators.maxLength(10),
  //           Validators.pattern(/^[0-9 ]+$/),
  //         ],
  //       ],
  //       email: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(14),
  //           Validators.maxLength(50),
  //           Validators.email,
  //         ],
  //       ],
  //       dob: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(10),
  //           Validators.maxLength(10),
  //           Validators.pattern(
  //             /^([0-3]){1}([0-9]){1}([-]){1}([0-1]){1}([0-9]){1}([-]){1}([1-2]){1}([9,0]){1}([0-9]){1}([0-9]){1}?$/
  //           ),
  //         ],
  //       ],
  //       gender: [
  //         'null',
  //         [Validators.required, Validators.pattern(/^[0-9 ]+$/)],
  //       ],
  //       nationality: [
  //         null,
  //         [Validators.required, Validators.pattern(/^[0-9a-zA-Z ]+$/)],
  //       ],
  //       pan: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(10),
  //           Validators.maxLength(10),
  //           Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/),
  //         ],
  //       ],
  //       aadhar: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(12),
  //           Validators.maxLength(12),
  //           Validators.pattern(/^[0-9 ]+$/),
  //         ],
  //       ],
  //       occupationType: ['', [Validators.required]],
  //       organizationType: [
  //         'null',
  //         [Validators.required, Validators.pattern(/^[0-9 ]+$/)],
  //       ],
  //       organizationSector: [
  //         'null',
  //         [Validators.required, Validators.pattern(/^[0-9-& ]+$/)],
  //       ],
  //       organizationName: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(2),
  //           Validators.maxLength(100),
  //           Validators.pattern(/^[0-9a-zA-Z-&,. ]+$/),
  //         ],
  //       ],
  //       income: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(3),
  //           Validators.maxLength(10),
  //           Validators.pattern(/^[0-9., ]+$/),
  //         ],
  //       ],
  //       startDate: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(10),
  //           Validators.maxLength(10),
  //           Validators.pattern(
  //             /^([0-3]){1}([0-9]){1}([-]){1}([0-1]){1}([0-9]){1}([-]){1}([1-2]){1}([9,0]){1}([0-9]){1}([0-9]){1}?$/
  //           ),
  //         ],
  //       ],
  //       employeeId: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(5),
  //           Validators.maxLength(15),
  //         ],
  //       ],
  //       designation: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(3),
  //           Validators.maxLength(100),
  //           Validators.pattern(/^[a-zA-Z ]+$/),
  //         ],
  //       ],
  //       experience: ['', [Validators.required]],
  //     });
  //   } else {
  //   }
  // }

  setFormValidation() {
    if (this.data.type == 'Business Loan') {
      this.personalDetailsForm.controls['gst'].setValidators([
        Validators.required,
        Validators.pattern(
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
        ),
      ]);
      this.personalDetailsForm.controls['startDate'].clearValidators();
      this.personalDetailsForm.controls['employeeId'].clearValidators();
      this.personalDetailsForm.controls['organizationSector'].clearValidators();
      this.personalDetailsForm.controls['occupationType'].clearValidators();
      this.personalDetailsForm.controls['companyNumber'].setValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['registeredAddressLine'].setValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['registeredLocality'].setValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['registeredCity'].setValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['registeredLandmark'].setValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['registeredState'].setValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['registeredPincode'].setValidators([
        Validators.required,
      ]);
    } else if (this.data.type == 'Gold Loan') {
      this.personalDetailsForm.controls['goldDetails'].setValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['karat'].setValidators([
        Validators.required,
      ]);
      this.clearWorlDetailValidation();
    }

    if (this.data.type == 'Education Loan') {
      this.getCourses();
      this.personalDetailsForm.controls['nomineeName'].addValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['nomineeRelation'].addValidators([
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ]);
      this.personalDetailsForm.controls['nomineeOccupationType'].addValidators([
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]);
      this.personalDetailsForm.controls['nomineeOccupation'].addValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['nomineeIncome'].addValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['nomineeNumber'].addValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['nomineePan'].addValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['nomineeAadhar'].addValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['sslcName'].addValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['sslcYear'].addValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['hscName'].addValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['hscYear'].addValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['collegeName'].addValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['collegeJoiningDate'].addValidators([
        Validators.required,
      ]);
      this.personalDetailsForm.controls['pan'].clearValidators();
      this.personalDetailsForm.controls['educationDetail'].setValue(true);

      this.clearWorlDetailValidation();
    }
  }

  clearWorlDetailValidation() {
    this.personalDetailsForm.controls['experience'].clearValidators();
    this.personalDetailsForm.controls['designation'].clearValidators();
    this.personalDetailsForm.controls['employeeId'].clearValidators();
    this.personalDetailsForm.controls['startDate'].clearValidators();
    this.personalDetailsForm.controls['organizationName'].clearValidators();
    this.personalDetailsForm.controls['organizationSector'].clearValidators();
    this.personalDetailsForm.controls['income'].clearValidators();
    this.personalDetailsForm.controls['occupationType'].clearValidators();
    this.personalDetailsForm.controls['organizationType'].clearValidators();
  }

  getCourses() {
    this.app.getCourses({ courseType: 1 }).subscribe((r) => {
      console.error(r);
      this.ugCourses = r.response.courseList;
    });

    this.app.getCourses({ courseType: 2 }).subscribe((r) => {
      console.error(r);
      this.pgCourses = r.response.courseList;
    });
  }

  getTodayDate(): string {
    let date = new Date();
    date.setUTCDate(date.getUTCDate());
    let d: string[] = date.toLocaleDateString().split('/').reverse();
    // d[0] = (Number(d[0]) - 18).toString();
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
}
