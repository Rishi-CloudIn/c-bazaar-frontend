import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
import { OffersService } from 'src/app/services/offers.service';
declare var $: any;

@Component({
  selector: 'app-fo-applications',
  templateUrl: './fo-applications.component.html',
  styleUrls: ['./fo-applications.component.css'],
})
export class FoApplicationsComponent implements OnInit {
  applicationList: any[] = [];
  isLoading: boolean = true;
  constructor(
    private cs: CommonService,
    private offer: OffersService,
    private app: LoanApplicationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {
    let data = { requestType: 'web', page: 1, countPerPage: 100 };
    this.cs.getFoApplications(data).subscribe((r: any) => {
      this.applicationList = r.response.applicationList;
      this.isLoading = false;

      console.log(r.response.applicationList[0]);
    });
  }

  applyOffer(id: any, status: any, cibilId: any) {
    if (status == 0 || status == 6 || status == 10) {
      let body = {
        offerId: id,
        cibilId: cibilId,
      };
      this.app.applicationResolver(body).subscribe((r: any) => {
        this.isLoading = false;
        console.error(r);
        this.pageRoute(r.response.currentPage, id, cibilId);
      });
    } else if (status == 7) {
      $('#homeLoan').modal('show');
    } else {
      this.router.navigate(['/dsa/complete/apply'], {
        queryParams: { offerId: id, cibilId: cibilId },
      });
    }
  }

  pageRoute(page: any, id: any, cibilId: any) {
    switch (page) {
      case 1:
        // this.router.navigate(['/offer/application/terms/', id]);
        this.router.navigate(['/dsa/apply/apply'], {
          queryParams: { offerId: id, cibilId: cibilId },
        });
        break;
      case 2:
        this.router.navigate(['/dsa/details/apply'], {
          queryParams: { offerId: id, cibilId: cibilId },
        });
        break;
      case 3:
        this.router.navigate(['/dsa/docs/apply'], {
          queryParams: { offerId: id, cibilId: cibilId },
        });
        break;
      case 4:
        this.router.navigate(['/dsa/preview/apply'], {
          queryParams: { offerId: id, cibilId: cibilId },
        });
        break;
      case 5:
        this.router.navigate(['/dsa/preview-docs/apply'], {
          queryParams: { offerId: id, cibilId: cibilId },
        });
        break;
      case 6:
        this.router.navigate(['/dsa/complete/apply'], {
          queryParams: { offerId: id, cibilId: cibilId },
        });
        break;
      default:
        this.router.navigate(['/dsa/apply/apply'], {
          queryParams: { offerId: id, cibilId: cibilId },
        });
    }
  }

  closeHomeLoanPop() {
    $('#homeLoan').modal('hide');
    // this.router.navigate(['/dashboard']);
    return;
  }

  view(id: any) {
    this.router.navigate(['/reinitiated-docs/' + id]);
  }
}
