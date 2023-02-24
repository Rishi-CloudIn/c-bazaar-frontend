import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { DsaService } from 'src/app/services/dsa.service';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
import { OffersService } from 'src/app/services/offers.service';
declare var $: any;

@Component({
  selector: 'app-dsa-applications',
  templateUrl: './dsa-applications.component.html',
  styleUrls: ['./dsa-applications.component.css'],
})
export class DsaApplicationsComponent implements OnInit {
  applicationList: any[] = [];
  products: any[] = [];
  selectedType: string = '';
  selectedCat: string = '';
  isLoading: boolean = true;
  searchTerm: string = '';
  constructor(
    private cs: CommonService,
    private offer: OffersService,
    private dsa: DsaService,
    private app: LoanApplicationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getApplications();
    this.getProducts();
  }

  getApplications() {
    let data = {
      requestType: 'web',
      page: 1,
      countPerPage: 20,
      search: this.searchTerm,
      type: this.selectedType,
      category: this.selectedCat,
    };
    this.cs.getApplications(data).subscribe((r: any) => {
      this.applicationList = r.response.applicationList;
      this.isLoading = false;

      console.log(r.response.applicationList[0]);
    });
  }

  applyOffer(id: any, status: any, cibilId: any, applicationId: any) {
    if (status == 0 || status == 10) {
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
    } else if (status == 8) {
      return;
    } else if (status == 6) {
      this.view(applicationId);
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

  getProducts() {
    this.dsa.getProducts().subscribe((r: any) => {
      this.products = r.response.products;
      console.error(r);
    });
  }

  ontypeChange(e: any) {
    if (e.value == '') {
      this.selectedType = '';
      this.selectedCat = '';
      this.getApplications();
      return;
    }
    let obj = this.products.find((o) => o.name === e.value);
    console.error(obj);
    this.selectedType = obj.type;
    this.selectedCat = obj.category;
    this.getApplications();
  }
}
