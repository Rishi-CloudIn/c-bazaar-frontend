import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DsaService } from 'src/app/services/dsa.service';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
import { OffersService } from 'src/app/services/offers.service';
import { ProfileService } from 'src/app/services/profile.service';
declare var $: any;

@Component({
  selector: 'app-dsa-offers',
  templateUrl: './dsa-offers.component.html',
  styleUrls: ['./dsa-offers.component.css'],
})
export class DsaOffersComponent implements OnInit {
  isLoading: boolean = true;
  showPop = true;
  selectedCat: any = null;
  badgeName: string = 'Home Loan';
  categoryList: any[] = [];
  offerList: any[] = [];
  onBoarded: boolean = true;
  offersCount!: number;
  count = 15;
  counterCount = 0;
  cibilScore: number = 0;
  id: string = '';
  constructor(
    private offer: OffersService,
    private app: LoanApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private ps: ProfileService,
    private dsa: DsaService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.onBoarded = this.ps.onBoarded;
    this.getoffers(this.id);
  }

  counter() {
    if (++this.counterCount > 15) {
      $('#cibilScore').modal('hide');
      this.showPop = false;
      return;
    }
    setTimeout(() => {
      this.count = this.count - 1;
      this.counter();
    }, 1000);
  }

  getoffers(id: any) {
    let data = {
      cibilId: id,
      category: this.selectedCat,
    };
    this.dsa.dsaOffers(data).subscribe((r: any) => {
      this.isLoading = false;
      if (r.status) {

        this.categoryList = r.response.categoryList;
        this.offerList = r.response.offers;
        this.offersCount = r.response.totalCount;
        this.cibilScore = r.response.cibilScore;
        if (this.showPop) {
          $('#cibilScore').modal('show');
          this.counter();
        }

      }
      console.log(r);
    });
  }

  switchCat(cat: any, catname: any) {
    this.selectedCat = cat;
    this.getoffers(this.id);
    this.badgeName = catname;
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

  viewOffer(id: any) {
    this.router.navigate(['/offer/view'], {
      queryParams: { offerId: id, cibilId: this.id },
    });
  }
  applyOfferRoute(id: any) {
    this.router.navigate(['/dsa/apply/apply'], {
      queryParams: { offerId: id, cibilId: this.id },
    });
  }

  unsetCounter(){
    $('#cibilScore').modal('hide');
      this.showPop = false;
  }
}
