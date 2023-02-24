import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { DsaService } from 'src/app/services/dsa.service';
declare var $: any;

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css'],
})
export class BanksComponent implements OnInit {
  bankList: any[] = [];
  products: any[] = [];
  isChecked: boolean = false;
  banks: any[] = [];
  bankForm!: FormGroup;
  isLoading: boolean = true;
  constructor(
    private fb: FormBuilder,
    private dsa: DsaService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.getBanks();
    this.getBankList();
    this.getProducts();
    this.initForm();
  }

  initForm() {
    this.bankForm = this.fb.group({
      bankId: [null, [Validators.required]],
      bankCode: [null, [Validators.required, Validators.minLength(5)]],
      dsaCode: [null, [Validators.required, Validators.minLength(5)]],
      type: [null, [Validators.required]],
      category: [null],
      product: [null, [Validators.required]],
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
      console.warn(r);
    });
  }

  getBankList() {
    let data = {
      page: 1,
      countPerPage: 20,
      requestType: 'web',
    };
    this.dsa.getBankList(data).subscribe((r: any) => {
      this.bankList = r.response.accountList;
      this.isLoading = false;
      console.warn(r);
    });
  }

  validateBank(field: any) {
    if (
      ((this.isChecked && this.bankForm.controls[field].invalid) ||
        (this.bankForm.controls[field].invalid &&
          (this.bankForm.controls[field].dirty ||
            this.bankForm.controls[field].touched))) &&
      this.bankForm.controls[field].errors
    ) {
      return true;
    }
    return false;
  }

  setCat() {
    let obj = this.products.find(
      (o) => o.name === this.bankForm.controls['product'].value
    );
    console.error(obj);
    this.bankForm.controls['category'].setValue(obj.category);
    this.bankForm.controls['type'].setValue(obj.type);
  }

  addBank() {
    if (this.bankForm.invalid) {
      this.isChecked = true;
      console.error(this.bankForm.value);
      return;
    }
    this.dsa.addBank(this.bankForm.value).subscribe((r: any) => {
      console.log(r);
      this.alert.fireToastS(r.message[0]);
      $('#bankModal').modal('hide');
      this.initForm();
      this.getBankList();
    });
  }
}
