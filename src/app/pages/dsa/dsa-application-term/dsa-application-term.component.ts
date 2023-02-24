import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dsa-application-term',
  templateUrl: './dsa-application-term.component.html',
  styleUrls: ['./dsa-application-term.component.css'],
})
export class DsaApplicationTermComponent implements OnInit {
  id: string = '';
  data: any;
  tempId: string = '';
  type: string = '';
  loanApplicationForm!: FormGroup;
  isLoading: boolean = true;
  termAccepted: boolean = false;
  isSubmitted: boolean = false;
  isChecked: boolean = false;
  cibilId: string = '';
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    private app: LoanApplicationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((r: any) => {
      this.id = r.offerId;
      this.cibilId = r.cibilId;
    });
    // this.id = this.route.snapshot.paramMap.get('id') || '';
    // console.log(this.id);
    this.getDetails();
  }

  getDetails() {
    let body = {
      offerId: this.id,
      cibilId: this.cibilId,
    };
    this.app.applicationResolver(body).subscribe((r: any) => {
      for (let i = 0; i < r.response.data.length; i++) {
        if (r.response.data[i].step == 'step 1') {
          this.data = r.response.data[i];
        }
      }
      this.type = r.response.type;
      this.tempId = r.response.tempId;
      this.loanForm(r.response.type, r);
      // if (r.response.type !== 'Credit Card') {
      //   this.loanApplicationForm.controls['requestedAmount'].setValue(
      //     r.response.requestedAmount
      //   );
      // }
      this.isLoading = false;
      console.log(this.data);
    });
  }

  validateLogin(field: any) {
    if (
      ((this.isSubmitted && this.loanApplicationForm.controls[field].invalid) ||
        (this.loanApplicationForm.controls[field].invalid &&
          (this.loanApplicationForm.controls[field].dirty ||
            this.loanApplicationForm.controls[field].touched))) &&
      this.loanApplicationForm.controls[field].errors
    ) {
      return true;
    }
    return false;
  }

  loanForm(type: any, r: any) {
    switch (type) {
      case 'Credit Card':
        break;

      case 'Home Loan':
        this.commonFB(r);
        break;

      case 'Vehicle Loan':
        this.vehicleFB(r);
        break;

      case 'Personal Loan':
        this.commonFB(r);
        break;

      case 'Business Loan':
        this.commonFB(r);
        break;

      case 'Gold Loan':
        this.commonFB(r);
        break;

      case 'Education Loan':
        this.commonFB(r);
        break;

      default:
    }
  }

  commonFB(r: any) {
    this.loanApplicationForm = this.fb.group({
      offerId: [this.id, []],
      tempId: [this.tempId, []],
      requestedAmount: ['', [Validators.required]],
      loanTerm: ['', [Validators.required]],
    });
    this.loanApplicationForm.controls['requestedAmount'].setValue(
      r.response.requestedAmount
    );
    this.loanApplicationForm.controls['loanTerm'].setValue(r.response.loanTerm);
    if (r.response.type == 'Education Loan') {
      this.loanApplicationForm.controls['loanTerm'].setValue(0);
    }
  }
  vehicleFB(r: any) {
    this.loanApplicationForm = this.fb.group({
      offerId: [this.id, []],
      tempId: [this.tempId, []],
      requestedAmount: ['', [Validators.required]],
      loanTerm: ['', [Validators.required]],
      quotedAmount: ['', [Validators.required]],
      vehicleType: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
    });
    this.loanApplicationForm.controls['requestedAmount'].setValue(
      r.response.requestedAmount
    );
    this.loanApplicationForm.controls['loanTerm'].setValue(r.response.loanTerm);
    this.loanApplicationForm.controls['quotedAmount'].setValue(
      r.response.quotedAmount
    );
    if (r.response.vehicleType !== undefined) {
      this.loanApplicationForm.controls['vehicleType'].setValue(
        r.response!.vehicleType
      );
    }
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

  currencyFromat(field: any) {
    // this.loanApplicationForm.controls[field].setValue(
    //   this.loanApplicationForm.controls[field].value.toLocaleString('en-IN')
    // );
  }

  submit() {
    if (this.type == 'Credit Card') {
      if (!this.termAccepted) {
        this.isSubmitted = true;
        return;
      }
      this.router.navigate(['/dsa/details/apply'], {
        queryParams: { offerId: this.id, cibilId: this.cibilId },
      });
      // this.router.navigate(['/offer/application/details/' + this.id]);
    } else {
      if (!this.termAccepted || !this.loanApplicationForm.valid) {
        this.isSubmitted = true;
        return;
      }

      this.loanApplicationForm.addControl(
        'cibilId',
        new FormControl(this.cibilId)
      );
      // console.error(this.loanApplicationForm.valid);
      this.app
        .applicationPersonalDetails(this.loanApplicationForm.value)
        .subscribe((r: any) => {
          if (r.status) {
            // this.router.navigate(['/offer/application/details/' + this.id]);
            this.router.navigate(['/dsa/details/apply'], {
              queryParams: { offerId: this.id, cibilId: this.cibilId },
            });
          }
        });
    }
  }

  setValue(field: any, value: any) {
    this.loanApplicationForm.controls[field].setValue(value);
  }
}
