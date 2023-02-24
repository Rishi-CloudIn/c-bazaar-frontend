import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
import { OffersService } from 'src/app/services/offers.service';
declare var $: any;

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css'],
})
export class MyApplicationsComponent implements OnInit {
  applicationList: any[] = [];
  isLoading: boolean = true;
  page: number = 1;
  countPerPage: number = 10;
  totalCount: number = 0;
  search: string = '';
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
    let data = {
      requestType: 'web',
      page: this.page,
      countPerPage: this.countPerPage,
      search: this.search,
    };
    this.cs.getApplications(data).subscribe((r: any) => {
      this.applicationList = r.response.applicationList;
      this.totalCount = r.response.totalCount;
      this.isLoading = false;

      console.log(r.response.applicationList[0]);
    });
  }

  applyOffer(id: any, status: any, applicationId: any) {
    if (status == 0  || status == 10) {
      let body = {
        offerId: id,
      };
      this.app.applicationResolver(body).subscribe((r: any) => {
        this.isLoading = false;
        console.error(r);
        this.pageRoute(r.response.currentPage, id);
      });
    } else if (status == 7) {
      $('#homeLoan').modal('show');
    } else if (status == 8) {
      return;
    } else if (status == 6) {
      this.view(applicationId);
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

  closeHomeLoanPop() {
    $('#homeLoan').modal('hide');
    // this.router.navigate(['/dashboard']);
    return;
  }

  // searchToggle(obj: any, evt: any) {
  //   var container = $(obj).closest('.search-wrapper');
  //   if (!container.hasClass('active')) {
  //     container.addClass('active');
  //     evt.preventDefault();
  //   } else if (
  //     container.hasClass('active') &&
  //     $(obj).closest('.input-holder').length == 0
  //   ) {
  //     container.removeClass('active');
  //     // clear input
  //     container.find('.search-input').val('');
  //   }
  // }

  view(id: any) {
    this.router.navigate(['/reinitiated-docs/' + id]);
  }
}
