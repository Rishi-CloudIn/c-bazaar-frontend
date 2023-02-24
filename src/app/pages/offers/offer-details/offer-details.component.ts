import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  Router,
} from '@angular/router';
import { OffersService } from 'src/app/services/offers.service';
import { Location } from '@angular/common';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
import { ProfileService } from 'src/app/services/profile.service';
declare var $: any;

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
})
export class OfferDetailsComponent implements OnInit {
  isLoading: boolean = true;
  id: string = '';
  cibilId: string = '';
  currentRoute: string = '';
  onBoarded: boolean = true;
  offerDetails: any;
  selectedId: string = '';
  suggestedOffers: any[] = [];
  type: any;
  routeHistory: string = '';
  role: string = '';
  firstTime: boolean = true;
  routeChangeCount: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private app: LoanApplicationService,
    private offer: OffersService,
    private location: Location,
    private ps: ProfileService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
      }

      if (event instanceof NavigationEnd) {
        if (this.routeChangeCount > 0) {
          this.initDetails();
        }
        // this.currentRoute = event.url;
        $('html, body').animate({ scrollTop: 0 }, 'slow');
      }

      if (event instanceof NavigationError) {
      }
    });
  }

  ngOnInit() {
    this.initDetails();
  }

  initDetails() {
    // this.onBoarded = this.ps.onBoarded;
    this.route.queryParams.subscribe((r: any) => {
      this.id = r.offerId;
      ++this.routeChangeCount;
      this.cibilId = r.cibilId;
      console.error(r.offerId);
      this.firstTime == false;
    });
    // console.log(this.id);
    this.getOfferDetails();
  }

  getOfferDetails() {
    this.offer.viewOfferDetails({ offerId: this.id }).subscribe((r: any) => {
      this.role = r.role;
      this.isLoading = false;
      this.onBoarded = r.response.onBoarded;
      this.suggestedOffers = r.response.suggestionList;
      this.offerDetails = r.response.offerDetails;
      this.type = r.response.offerDetails.typeId;
      console.log(r);
    });
  }

  back(): void {
    // this.location.back();
    console.error(this.location.back());
  }

  applyOffer(id: any, status: any) {
    if (this.role == 'dsa') {
      console.error('dsa da');
      this.router.navigate(['/offer/application/terms/view'], {
        queryParams: { offerId: id, cibilId: this.cibilId },
      });
      return;
    }

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
      this.getOfferDetails();
      $('#interest').modal('hide');
    });
  }

  viewOffer(id: any) {
    console.error(this.suggestedOffers);
    this.router.navigate(['/offer/view'], {
      queryParams: { offerId: id, cibilId: '' },
    });
  }
}
