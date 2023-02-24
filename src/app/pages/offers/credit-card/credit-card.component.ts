import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
import { OffersService } from 'src/app/services/offers.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css'],
})
export class CreditCardComponent implements OnInit {
  isLoading: boolean = true;
  selectedCat: any = null;
  onBoarded: boolean = true;
  categoryList: any[] = [];
  offerList: any[] = [];
  offersCount!: number;

  constructor(
    private offer: OffersService,
    private app: LoanApplicationService,
    private router: Router,
    private ps: ProfileService
  ) {}

  ngOnInit() {
    this.onBoarded = this.ps.onBoarded;
    this.getoffers();
  }

  getoffers() {
    let data = {
      type: 'creditCard',
      category: this.selectedCat,
    };
    this.offer.getOffers(data).subscribe((r: any) => {
      if (r.status) {
        console.log(r.response.onBoarded);
        this.categoryList = r.response.categoryList;
        this.offerList = r.response.offers;
        this.offersCount = r.response.totalCount;
      }
      // setTimeout(() => {
      //   this.isLoading = false;
      // }, 1000);
      this.isLoading = false;
      console.log(r);
    });
  }

  switchCat(cat: any) {
    this.selectedCat = cat;
    this.getoffers();
  }

  onboard() {
    this.router.navigate(['onboard']);
    setTimeout(() => {
      location.reload();
    }, 700);
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

  viewOffer(id:any) {
    this.router.navigate(['/offer/view'], {
      queryParams: { offerId: id, cibilId: '' },
    });
  }
}
