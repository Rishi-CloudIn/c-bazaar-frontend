import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
declare var $: any;

@Component({
  selector: 'app-dsa-docs-upload',
  templateUrl: './dsa-docs-upload.component.html',
  styleUrls: ['./dsa-docs-upload.component.css'],
})
export class DsaDocsUploadComponent implements OnInit {
  @Input() multiple: boolean = false;
  @Input() fileType: string = '.pdf,.jpg,.jpeg,.webe,.png';
  @Input() dragDropEnabled = true;
  @Output() filesChanged: EventEmitter<FileList>;
  @ViewChild('fileInput' && 'fileInput2' && 'fileInput3')
  inputRef0!: ElementRef<HTMLInputElement>;

  id: string = '';
  role: string = '';
  tempId: string = '';
  docsUploadForm!: FormGroup;
  homeLoanForm!: FormGroup;

  data: any;
  isLoading: boolean = true;
  termAccepted: boolean = false;
  isSubmitted: boolean = false;
  aadharBackEnabled: boolean = false;
  nomineeAadharBackEnabled: boolean = false;
  numArrayForm16: any[] = [0];
  numArrayPayslip: any[] = [0];
  numArrayCancelledLeaves: any[] = [0];
  type: string = '';
  year = new Date().getFullYear();
  itrYears: any[] = [this.year, this.year - 1, this.year - 2, this.year - 3];
  itrYear1: number = 0;
  itrYear2: number = 0;
  itrYear3: number = 0;
  numberOfYears: number = 1;
  numArray: any[] = [0];
  cibilId: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    private cs: CommonService,
    private app: LoanApplicationService
  ) {
    this.filesChanged = new EventEmitter();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((r: any) => {
      this.id = r.offerId;
      this.cibilId = r.cibilId;
    });
    // this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getDetails();
    // console.error(this.data);
  }

  getDetails() {
    let body = {
      offerId: this.id,
      cibilId: this.cibilId,
    };
    this.app.applicationResolver(body).subscribe((r: any) => {
      this.tempId = r.response.tempId;
      this.type = r.response.type;
      for (let i = 0; i < r.response.data.length; i++) {
        if (r.response.data[i].step == 'step 3') {
          this.data = r.response.data[i];
        }
      }
      this.getDocs(r.response.tempId);
      // this.isLoading = false;
      console.error(this.data);
    });
  }

  getDocs(id: any) {
    let data = {
      tempId: id,
    };
    this.app.getSavedLoanDocuments(data).subscribe((r: any) => {
      console.error(r);
      this.role = r.response.type;
      if (this.type === 'Business Loan') {
        this.initSelfForm();
      } else {
        if (r.response.type == 'Salaried') {
          this.initSalariedForm();
        } else {
          this.initSelfForm();
        }
      }

      if (r.response.savedData) {
        for (let i = 0; i < r.response.documentList.length; i++) {
          // console.error(r.response.documentList[i].type);
          if (
            r.response.documentList[i].type !== 'aadhar' &&
            r.response.documentList[i].type !== 'itr' &&
            r.response.documentList[i].type !== 'nomineeAadhar' &&
            r.response.documentList[i].type !== 'markSheet' &&
            r.response.documentList[i].type !== 'payslip' &&
            r.response.documentList[i].type !== 'cancelledCheckLeaf'
          ) {
            this.docsUploadForm.controls[
              r.response.documentList[i].type
            ].setValue(r.response.documentList[i].url[0].url);
          } else if (r.response.documentList[i].type === 'aadhar') {
            if (r.response.documentList[i].url.length == 1) {
              this.docsUploadForm.controls['aadhar1'].setValue(
                r.response.documentList[i].url[0].url
              );
            } else {
              this.aadharBackEnabled = true;
              this.docsUploadForm.controls['aadhar1'].setValue(
                r.response.documentList[i].url[0].url
              );
              this.docsUploadForm.controls['aadhar2'].setValue(
                r.response.documentList[i].url[1].url
              );
            }
          } else if (r.response.documentList[i].type === 'markSheet') {
            this.docsUploadForm.controls['sslcMarkSheet'].setValue(
              r.response.documentList[i].url[0].url
            );
            this.docsUploadForm.controls['hscMarkSheet'].setValue(
              r.response.documentList[i].url[1].url
            );
          } else if (r.response.documentList[i].type === 'nomineeAadhar') {
            if (r.response.documentList[i].url.length == 1) {
              this.docsUploadForm.controls['nomineeAadhar1'].setValue(
                r.response.documentList[i].url[0].url
              );
            } else {
              this.nomineeAadharBackEnabled = true;
              this.docsUploadForm.controls['nomineeAadhar1'].setValue(
                r.response.documentList[i].url[0].url
              );
              this.docsUploadForm.controls['nomineeAadhar2'].setValue(
                r.response.documentList[i].url[1].url
              );
            }
          }

          if (r.response.documentList[i].type == 'itr') {
            for (let j = 0; j < r.response.documentList[i].url.length; j++) {
              if (j > 0) {
                this.addItr();
              }
              this.docsUploadForm.controls['itr' + j].setValue(
                r.response.documentList[i].url[j].url
              );
              this.docsUploadForm.controls['itrYear' + j].setValue(
                r.response.documentList[i].url[j].year
              );
              console.error(
                r.response.documentList[i],
                this.docsUploadForm.controls['itrYear' + j].value
              );
            }
          }
          if (r.response.documentList[i].type == 'payslip') {
            for (let j = 0; j < r.response.documentList[i].url.length; j++) {
              if (j > 0) {
                this.addPayslip();
              }
              this.docsUploadForm.controls['payslip' + j].setValue(
                r.response.documentList[i].url[j].url
              );
            }
          }
          if (r.response.documentList[i].type == 'cancelledCheckLeaf') {
            for (let j = 0; j < r.response.documentList[i].url.length; j++) {
              if (j > 0) {
                this.addChequeLeaf();
              }
              this.docsUploadForm.controls['cancelledCheckLeaf' + j].setValue(
                r.response.documentList[i].url[j].url
              );
            }
          }
          // console.error(r.response.documentList[i].type);
        }
      }
    });
  }
  removeFile(field: any) {
    $('#test').val(null);
    this.docsUploadForm.controls[field].setValue('');
  }

  submit() {
    if (!this.termAccepted || this.docsUploadForm.invalid) {
      this.isSubmitted = true;
      console.error(this.docsUploadForm.status, this.docsUploadForm.value);
      return;
    }
    let data = this.setValue();
    console.error(data);
    this.app.saveLoanDocuments(data).subscribe((r: any) => {
      if (r.status) {
        console.error(r);
        this.alert.fireToastS(r.message[0]);
        this.router.navigate(['/dsa/preview/apply'], {
          queryParams: { offerId: this.id, cibilId: this.cibilId },
        });
        // this.router.navigate(['/offer/application/preview_details/' + this.id]);
      }
    });
  }

  addFiles(files: any, field: any): void {
    console.log(files);
    if (files[0].size > 8388608) {
      this.alert.fireToastF('File size is too long');
      $('#test').val(null);

      return;
    }
    this.filesChanged.emit(files[0]);
    this.upload(files[0], field);
  }

  handleFileDrop(event: DragEvent, field: any) {
    if (event?.dataTransfer?.files?.length) {
      const files = event.dataTransfer.files;
      // this.inputRef.nativeElement.files = files;
      this.addFiles(files, field);
    }
  }

  addAadharBack() {
    this.aadharBackEnabled = !this.aadharBackEnabled;
    if (this.aadharBackEnabled) {
      this.docsUploadForm.controls['aadhar2'].addValidators([
        Validators.required,
      ]);
    } else {
      this.docsUploadForm.controls['aadhar2'].removeValidators([
        Validators.required,
      ]);
    }
  }

  addNomineeAadharBack() {
    this.nomineeAadharBackEnabled = !this.nomineeAadharBackEnabled;
    if (this.nomineeAadharBackEnabled) {
      this.docsUploadForm.controls['nomineeAadhar2'].addValidators([
        Validators.required,
      ]);
    } else {
      this.docsUploadForm.controls['nomineeAadhar2'].removeValidators([
        Validators.required,
      ]);
    }
  }

  upload(file: File, field: any) {
    console.error(field);
    const formData = new FormData();
    formData.append('creditBazaarDocument', file);
    this.cs.upload(formData).subscribe((r: any) => {
      console.log(r);
      if (r.status) {
        console.log(r);
        this.docsUploadForm.controls[field].setValue(r.response.url);
        return r;
      }
    });
  }

  addItr() {
    if (this.numArray.length < 3) {
      this.numArray.push(0);
      this.docsUploadForm.controls[
        'itrYear' + (this.numArray.length - 1)
      ].addValidators([Validators.required, Validators.pattern(/^[0-9 ]+$/)]);
      this.docsUploadForm.controls[
        'itr' + (this.numArray.length - 1)
      ].addValidators([Validators.required]);
    }
  }

  addPayslip() {
    if (this.numArrayPayslip.length < 3) {
      this.numArrayPayslip.push(0);
    }
  }

  addChequeLeaf() {
    if (this.numArrayCancelledLeaves.length < 5) {
      this.numArrayCancelledLeaves.push(0);
    }
  }
  removeItr() {
    if (this.numArray.length > 1) {
      this.numArray.splice(-1);
      this.docsUploadForm.controls[
        'itrYear' + (this.numArray.length - 1)
      ].clearValidators();
      this.docsUploadForm.controls[
        'itr' + (this.numArray.length - 1)
      ].clearValidators();
    }
  }
  removeItr2(field1: any, field2: any, type: any) {
    switch (type) {
      case 'itr':
        if (this.numArray.length > 1) {
          let data = [
            'itrYear' + (this.numArray.length - 1),
            'itr' + (this.numArray.length - 1),
          ];
          this.rmvRequired(data);
          this.numArray.splice(-1);
        }
        break;

      case 'payslip':
        if (this.numArrayPayslip.length > 1) {
          this.numArrayPayslip.splice(-1);
        }
        break;
      case 'chequeLeaf':
        if (this.numArrayCancelledLeaves.length > 1) {
          this.numArrayCancelledLeaves.splice(-1);
        }
        break;

      default:
        break;
    }
    this.docsUploadForm.controls[field1].clearValidators();
    this.docsUploadForm.controls[field2].clearValidators();
    this.docsUploadForm.controls[field1].setValue('');
    this.docsUploadForm.controls[field2].setValue('');
  }

  initSalariedForm() {
    this.docsUploadForm = this.fb.group({
      pan: ['', [Validators.required]],
      nomineePan: [''],
      photo: ['', [Validators.required]],
      aadhar1: ['', [Validators.required]],
      nomineeAadhar1: [''],
      nomineeAadhar2: [''],
      form16: [''],
      aadhar2: [''],
      payslip: [''],
      payslip0: [''],
      payslip1: [''],
      payslip2: [''],
      salesTax: ['', []],
      companyPan: [''],
      currentAccount: [''],
      bankStatement: [''],
      offerLetter: [''],
      itr0: [''],
      itr1: ['', []],
      itr2: ['', []],
      idCard: [''],
      itrYear0: [''],
      itrYear1: [''],
      itrYear2: [''],
      landDocument: ['', []],
      patta: [''],
      sitta: [''],
      blueprint: [''],
      electricBill: [''],
      buildingApproval: [''],
      planApproval: [''],
      gst: [''],
      soleProp: [''],
      memorandum: [''],
      balanceSheet: [''],
      cancelledCheckLeaf: [''],
      cancelledCheckLeaf0: [''],
      cancelledCheckLeaf1: [''],
      cancelledCheckLeaf2: [''],
      cancelledCheckLeaf3: [''],
      cancelledCheckLeaf4: [''],
      sslcMarkSheet: [''],
      hscMarkSheet: [''],
      feesStructure: [''],
      feesPaidBill: [''],
      bonafideCertificate: [''],
      // form16Years: this.fb.array([]),
    });
    this.setFormValidation();
    this.isLoading = false;
    // this.addDocs('form16Years');
  }

  initSelfForm() {
    this.docsUploadForm = this.fb.group({
      pan: ['', [Validators.required]],
      nomineePan: [''],
      photo: ['', [Validators.required]],
      aadhar1: ['', [Validators.required]],
      aadhar2: ['', []],
      nomineeAadhar1: [''],
      nomineeAadhar2: [''],
      idCard: [''],
      itr0: [''],
      itr1: ['', []],
      itr2: ['', []],
      form16: [''],
      payslip: [''],
      payslip0: [''],
      payslip1: [''],
      payslip2: [''],
      bankStatement: [''],
      offerLetter: [''],
      salesTax: ['', []],
      companyPan: [''],
      currentAccount: [''],
      itrYear0: ['', ,],
      itrYear1: [''],
      itrYear2: [''],
      landDocument: [''],
      patta: [''],
      sitta: [''],
      blueprint: [''],
      electricBill: [''],
      buildingApproval: [''],
      planApproval: [''],
      gst: [''],
      soleProp: [''],
      memorandum: [''],
      balanceSheet: [''],
      cancelledCheckLeaf: [''],
      cancelledCheckLeaf0: [''],
      cancelledCheckLeaf1: [''],
      cancelledCheckLeaf2: [''],
      cancelledCheckLeaf3: [''],
      cancelledCheckLeaf4: [''],
      sslcMarkSheet: [''],
      hscMarkSheet: [''],
      feesStructure: [''],
      feesPaidBill: [''],
      bonafideCertificate: [''],
    });
    this.setFormValidation();
    this.isLoading = false;
  }

  setValue() {
    if (this.type == 'Business Loan') {
      this.role = 'Self';
    }
    if (this.role == 'Salaried') {
      let data = {
        tempId: this.tempId,
        documentList: [
          {
            type: 'pan',
            url: this.docsUploadForm.controls['pan'].value,
          },
          {
            type: 'nomineePan',
            url: this.docsUploadForm.controls['nomineePan'].value,
          },

          {
            type: 'photo',
            url: this.docsUploadForm.controls['photo'].value,
          },
          {
            type: 'aadhar',
            url: this.setAadharArray(),
          },
          {
            type: 'nomineeAadhar',
            url: this.setAadharArray2(),
          },
          {
            type: 'itr',
            url: this.setItrArray(),
          },
          {
            type: 'form16',
            url: this.docsUploadForm.controls['form16'].value,
          },
          {
            type: 'payslip',
            url: this.setPayslipArray(),
          },
          {
            type: 'bankStatement',
            url: this.docsUploadForm.controls['bankStatement'].value,
          },
          {
            type: 'offerLetter',
            url: this.docsUploadForm.controls['offerLetter'].value,
          },
          {
            type: 'idCard',
            url: this.docsUploadForm.controls['idCard'].value,
          },
          // 'landDocument','patta','sitta','blueprint','electricBill','buildingApproval','planApproval'

          {
            type: 'landDocument',
            url: this.docsUploadForm.controls['landDocument'].value,
          },
          {
            type: 'patta',
            url: this.docsUploadForm.controls['patta'].value,
          },
          {
            type: 'sitta',
            url: this.docsUploadForm.controls['sitta'].value,
          },
          {
            type: 'blueprint',
            url: this.docsUploadForm.controls['blueprint'].value,
          },
          {
            type: 'electricBill',
            url: this.docsUploadForm.controls['electricBill'].value,
          },
          {
            type: 'buildingApproval',
            url: this.docsUploadForm.controls['buildingApproval'].value,
          },
          {
            type: 'planApproval',
            url: this.docsUploadForm.controls['planApproval'].value,
          },
          {
            type: 'markSheet',
            url: [
              {
                url: this.docsUploadForm.controls['sslcMarkSheet'].value,
                year: '10',
              },
              {
                url: this.docsUploadForm.controls['hscMarkSheet'].value,
                year: '12',
              },
            ],
          },

          {
            type: 'feesStructure',
            url: this.docsUploadForm.controls['feesStructure'].value,
          },
          {
            type: 'bonafideCertificate',
            url: this.docsUploadForm.controls['bonafideCertificate'].value,
          },
          {
            type: 'feesPaidBill',
            url: this.docsUploadForm.controls['feesPaidBill'].value,
          },
        ],
      };
      return data;
    } else {
      let data = {
        tempId: this.tempId,
        documentList: [
          {
            type: 'pan',
            url: this.docsUploadForm.controls['pan'].value,
          },
          {
            type: 'nomineePan',
            url: this.docsUploadForm.controls['nomineePan'].value,
          },

          {
            type: 'photo',
            url: this.docsUploadForm.controls['photo'].value,
          },
          {
            type: 'aadhar',
            url: this.setAadharArray(),
          },
          {
            type: 'nomineeAadhar',
            url: this.setAadharArray2(),
          },
          {
            type: 'itr',
            url: this.setItrArray(),
          },
          {
            type: 'salesTax',
            url: this.docsUploadForm.controls['salesTax'].value,
          },
          {
            type: 'companyPan',
            url: this.docsUploadForm.controls['companyPan'].value,
          },
          {
            type: 'currentAccount',
            url: this.docsUploadForm.controls['currentAccount'].value,
          },

          {
            type: 'landDocument',
            url: this.docsUploadForm.controls['landDocument'].value,
          },
          {
            type: 'patta',
            url: this.docsUploadForm.controls['patta'].value,
          },
          {
            type: 'sitta',
            url: this.docsUploadForm.controls['sitta'].value,
          },
          {
            type: 'blueprint',
            url: this.docsUploadForm.controls['blueprint'].value,
          },
          {
            type: 'electricBill',
            url: this.docsUploadForm.controls['electricBill'].value,
          },
          {
            type: 'buildingApproval',
            url: this.docsUploadForm.controls['buildingApproval'].value,
          },
          {
            type: 'planApproval',
            url: this.docsUploadForm.controls['planApproval'].value,
          },
          {
            type: 'gst',
            url: this.docsUploadForm.controls['gst'].value,
          },
          {
            type: 'soleProp',
            url: this.docsUploadForm.controls['soleProp'].value,
          },
          {
            type: 'memorandum',
            url: this.docsUploadForm.controls['memorandum'].value,
          },
          {
            type: 'cancelledCheckLeaf',
            url: this.setCheckArray(),
          },
          {
            type: 'balanceSheet',
            url: this.docsUploadForm.controls['balanceSheet'].value,
          },
          {
            type: 'markSheet',
            url: [
              {
                url: this.docsUploadForm.controls['sslcMarkSheet'].value,
                year: '10',
              },
              {
                url: this.docsUploadForm.controls['hscMarkSheet'].value,
                year: '12',
              },
            ],
          },

          {
            type: 'feesStructure',
            url: this.docsUploadForm.controls['feesStructure'].value,
          },
          {
            type: 'bonafideCertificate',
            url: this.docsUploadForm.controls['bonafideCertificate'].value,
          },
          {
            type: 'feesPaidBill',
            url: this.docsUploadForm.controls['feesPaidBill'].value,
          },
        ],
      };
      return data;
    }
  }

  setItrArray() {
    let data = [];
    for (let i = 0; i < this.numArray.length; i++) {
      if (
        this.docsUploadForm.controls['itr' + i].value !== '' &&
        this.docsUploadForm.controls['itrYear' + i].value !== ''
      ) {
        data.push({
          url: this.docsUploadForm.controls['itr' + i].value,
          year: this.docsUploadForm.controls['itrYear' + i].value,
        });
      }
    }
    return data;
  }

  setPayslipArray() {
    let data = [];
    for (let i = 0; i < this.numArrayPayslip.length; i++) {
      if (this.docsUploadForm.controls['payslip' + i].value !== '') {
        data.push({
          url: this.docsUploadForm.controls['payslip' + i].value,
          year: i,
        });
      }
    }
    return data;
  }

  setCheckArray() {
    let data = [];
    for (let i = 0; i < this.numArrayCancelledLeaves.length; i++) {
      if (this.docsUploadForm.controls['cancelledCheckLeaf' + i].value !== '') {
        data.push({
          url: this.docsUploadForm.controls['cancelledCheckLeaf' + i].value,
          year: i,
        });
      }
    }
    return data;
  }

  setAadharArray() {
    let data = [];
    if (this.aadharBackEnabled) {
      data.push(
        {
          url: this.docsUploadForm.controls['aadhar1'].value,
          year: 'front',
        },
        {
          url: this.docsUploadForm.controls['aadhar2'].value,
          year: 'back',
        }
      );
    } else {
      data.push({
        url: this.docsUploadForm.controls['aadhar1'].value,
        year: 'front',
      });
    }
    return data;
  }
  setAadharArray2() {
    let data = [];
    if (this.nomineeAadharBackEnabled) {
      data.push(
        {
          url: this.docsUploadForm.controls['nomineeAadhar1'].value,
          year: 'front',
        },
        {
          url: this.docsUploadForm.controls['nomineeAadhar2'].value,
          year: 'back',
        }
      );
    } else {
      data.push({
        url: this.docsUploadForm.controls['nomineeAadhar1'].value,
        year: 'front',
      });
    }
    return data;
  }

  get docsForm() {
    return this.docsUploadForm.controls;
  }

  setFormValidation() {
    switch (this.type) {
      case 'Vehicle Loan':
        {
          if (this.role == 'Salaried') {
            let data = [
              'payslip0',
              'bankStatement',
              'offerLetter',
              'idCard',
              'itr0',
              'itrYear0',
            ];
            this.addRequired(data);
          } else {
            let data = [
              'companyPan',
              'currentAccount',
              'salesTax',
              'itr0',
              'itrYear0',
            ];
            this.addRequired(data);
          }
        }
        break;

      case 'Home Loan':
        {
          if (this.role == 'Salaried') {
            let data = [
              'payslip0',
              'bankStatement',
              'offerLetter',
              'idCard',
              'itr0',
              'itrYear0',
              'landDocument',
              'patta',
              'blueprint',
              'electricBill',
            ];
            this.addRequired(data);
          } else {
            let data = [
              'companyPan',
              'currentAccount',
              'salesTax',
              'itr0',
              'itrYear0',
              'landDocument',
              'patta',
              'blueprint',
              'electricBill',
            ];
            this.addRequired(data);
          }
        }
        break;

      case 'Business Loan':
        {
          this.role = 'Self';
          let data = [
            // 'payslip',
            // 'bankStatement',
            // 'offerLetter',
            // 'idCard',
            'itr0',
            'itrYear0',
            'gst',
            'memorandum',
            'balanceSheet',
            'cancelledCheckLeaf0',
            'companyPan',
            'currentAccount',
            'salesTax',
          ];
          this.addRequired(data);
        }
        break;

      case 'Education Loan':
        {
          // this.docsUploadForm.controls['itrYear0'].setValue(2022);
          let data = [
            'nomineeAadhar1',
            'sslcMarkSheet',
            'hscMarkSheet',
            'feesStructure',
            'bonafideCertificate',
            'nomineePan',
            'feesPaidBill',
          ];
          this.addRequired(data);

          // this.rmvRequired(data2)
          // this.docsUploadForm.controls['pan'].clearValidators();
          this.docsUploadForm.updateValueAndValidity();
        }
        break;

      case 'Personal Loan':
        {
          if (this.role == 'Salaried') {
            let data = [
              'payslip0',
              'bankStatement',
              'offerLetter',
              'idCard',
              'itr0',
              'itrYear0',
              'form16',
            ];
            this.addRequired(data);
          } else {
            let data = [
              'companyPan',
              'currentAccount',
              'salesTax',
              'itr0',
              'itrYear0',
            ];
            this.addRequired(data);
          }
        }
        break;

      case 'Credit Card': {
        if (this.role == 'Salaried') {
          let data = [
            'payslip0',
            'bankStatement',
            'offerLetter',
            'idCard',
            'itr0',
            'itrYear0',
          ];
          this.addRequired(data);
        } else {
          let data = [
            'companyPan',
            'currentAccount',
            'salesTax',
            'itr0',
            'itrYear0',
          ];
          this.addRequired(data);
        }
      }
    }

    this.isLoading = false;
  }

  addRequired(field: any[]) {
    for (let item of field) {
      this.docsUploadForm.controls[item.toString()].setValidators([
        Validators.required,
      ]);
    }
  }
  rmvRequired(field: any[]) {
    for (let item of field) {
      this.docsUploadForm.controls[item].clearValidators();
    }
  }

  back() {
    this.router.navigate(['/dsa/details/apply'], {
      queryParams: { offerId: this.id, cibilId: this.cibilId },
    });
  }
}
