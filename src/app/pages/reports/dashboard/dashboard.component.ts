import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/resolvers/application.service';
import { CommonService } from 'src/app/services/common.service';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
import { OffersService } from 'src/app/services/offers.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  onBoarded: boolean = false;
  offerData: any;
  dashboardData: any;
  selectedId: string = '';
  creditData: any;
  selectedReport: any;
  selectedReportData: any;
  isLoading: boolean = true;
  constructor(
    private cs: CommonService,
    private router: Router,
    private offer: OffersService,
    private app: LoanApplicationService
  ) {}

  ngOnInit() {
    this.getDashboard();
  }

  getDashboard() {
    let data = {};
    this.cs.getDashboard(data).subscribe((r: any) => {
      if (r.status) {
        console.log(r.response.onBoarded);
        this.onBoarded = r.response.onBoarded;

        for (let i = 0; i < r.response.dashboard.length; i++) {
          if (
            r.response.dashboard[i].type == 'emptyOnboard' ||
            r.response.dashboard[i].type == 'onboard'
          ) {
            this.dashboardData = r.response.dashboard[i];
            // console.error(this.dashboardData);

            // console.error(r.response.dashboard[i]);
            // this.selectedReportData = r.response.dashboard[i].values[0];
            if (r.response.onBoarded) {
              this.selectedReport = r.response.dashboard[i].values[0].type;
              this.selectedReportData = r.response.dashboard[i].values[0];
            }
          } else if (r.response.dashboard[i].type == 'offers') {
            this.offerData = r.response.dashboard[i];
          } else if (r.response.dashboard[i].type == 'creditFactors') {
            this.creditData = r.response.dashboard[i];
          }
        }
      }
      this.isLoading = false;
    });
  }

  onboard() {
    this.router.navigate(['onboard']);
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  changeReportProvider(type: any) {
    // console.error(type);
    for (var i = 0; i < 3; i++) {
      if (this.dashboardData.values[i].type == type) {
        this.selectedReportData = this.dashboardData.values[i];
        this.selectedReport = type;
      }
    }
  }

  applyOffer(id: any, status: any) {
    if (status == 0 || status == 6 || status == 10) {
      let body = {
        offerId: id,
      };
      this.app.applicationResolver(body).subscribe((r: any) => {
        this.isLoading = false;
        console.error(r);
        this.pageRoute(r.response.currentPage, id);
      });
    } else {
      this.router.navigate(['/offer/application/complete/', id]);
    }
  }

  pageRoute(page: any, id: any) {
    switch (page) {
      case 1:
        this.router.navigate(['/offer/application/terms/', id]);
        break;
      case 2:
        this.router.navigate(['/offer/application/details/', id]);
        break;
      case 3:
        this.router.navigate(['/offer/application/personal_docs/', id]);
        break;
      case 4:
        this.router.navigate(['/offer/application/preview_details/', id]);
        break;
      case 5:
        this.router.navigate(['/offer/application/sign/', id]);
        break;
      case 6:
        this.router.navigate(['/offer/application/complete/', id]);
        break;
      default:
        this.router.navigate(['/offer/application/terms/', id]);
    }
  }

  interestPop(id: string) {
    this.selectedId = id;
    $('#interest').modal('show');
  }
  showInterest() {
    let data = { offerId: this.selectedId };
    this.offer.showInterest(data).subscribe((r: any) => {
      console.log(r);
      this.getDashboard();
      $('#interest').modal('hide');
    });
  }

  viewOffer(id:any) {
    this.router.navigate(['/offer/view'], {
      queryParams: { offerId: id, cibilId: '' },
    });
  }
}

// {
//   "type": "onboard",
//   "bannerImg": "https://cbazzar.cloudinlabs.com/storage/icons/Dashboard.svg",
//   "title": "John, Here's your score for May 22",
//   "note": "Your score may vary from each bureaus as each bureaus as follows",
//   "values": [
//       {
//           "type": "cibil",
//           "imageUrl": "https://cbazzar.cloudinlabs.com/storage/icons/Cibil_Logo.svg",
//           "minCibil": 300,
//           "maxCibil": 900,
//           "cibilScore": 850,
//           "status": "Excellent",
//           "change": 38
//       },
//       {
//           "type": "experian",
//           "imageUrl": "https://cbazzar.cloudinlabs.com/storage/icons/Experian_Logo.svg",
//           "minCibil": 300,
//           "maxCibil": 900,
//           "cibilScore": 830,
//           "status": "Excellent",
//           "change": 18
//       },
//       {
//           "type": "equifax",
//           "imageUrl": "https://cbazzar.cloudinlabs.com/storage/icons/Equifax_Logo.svg",
//           "minCibil": 300,
//           "maxCibil": 900,
//           "cibilScore": 842,
//           "status": "Excellent",
//           "change": 30
//       }
//   ]
// }
