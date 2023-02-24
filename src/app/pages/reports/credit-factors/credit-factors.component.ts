import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-credit-factors',
  templateUrl: './credit-factors.component.html',
  styleUrls: ['./credit-factors.component.css'],
})
export class CreditFactorsComponent implements OnInit {
  selectedFactor: string = 'paymentHistory';
  isLoading: boolean = true;
  ccData: any = { bankData: [] };
  loanData: any = { bankData: [] };
  detailsData: any = { bankData: [] };
  factorsList: any[] = [
    {
      name: 'payment history',
      value: 'paymentHistory',
      icon: '../../../../assets/img/Dashboard/Credit Factor/Payment History.svg',
    },
    {
      name: 'credit card utilization',
      value: 'creditCardUtilization',
      icon: '../../../../assets/img/Dashboard/Credit Factor/Payment History.svg',
    },
    {
      name: 'credit history',
      value: 'creditHistory',
      icon: '../../../../assets/img/Dashboard/Credit Factor/Payment History.svg',
    },
    {
      name: 'total accounts',
      value: 'totalAccounts',
      icon: '../../../../assets/img/Dashboard/Credit Factor/Payment History.svg',
    },
    {
      name: 'credit enquiries',
      value: 'creditEnquiries',
      icon: '../../../../assets/img/Dashboard/Credit Factor/Payment History.svg',
    },
  ];
  cardData: any;
  constructor(private cs: CommonService) {}

  ngOnInit() {
    this.getCFactors();
  }

  getCFactors() {
    let data = {
      factorType: this.selectedFactor,
    };
    this.cs.getCFactors(data).subscribe((r: any) => {
      console.log(r);
      for (let i = 0; i < r.response.data.length; i++) {
        if (r.response.data[i].type == this.selectedFactor) {
          this.cardData = r.response.data[i];
          // console.error(r.response.dashboard[i]);
          // this.selectedReportData = r.response.dashboard[i].values[0];
        } else if (r.response.data[i].type == 'creditCard') {
          this.ccData = r.response.data[i];
        } else if (r.response.data[i].type == 'loans') {
          this.loanData = r.response.data[i];
        } else if (r.response.data[i].type == 'details') {
          this.detailsData = r.response.data[i];
        }
      }
      this.isLoading = false;
      // console.error(this.cardData);
    });
  }

  selectFactor(factor: any) {
    this.loanData = { bankData: [] };
    this.detailsData ={ bankData: [] };
    this.ccData = { bankData: [] };

    this.selectedFactor = factor;
    this.getCFactors();
  }
}
