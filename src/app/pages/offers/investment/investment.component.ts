import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffersService } from 'src/app/services/offers.service';
declare var $: any;

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
})
export class InvestmentComponent implements OnInit {
  isLoading: boolean = true;
  selectedCat: any = null;
  selectedId: string = '';
  categoryList: any[] = [];
  offerList: any[] = [];
  offersCount!: number;
  badgeName: string = 'Mutual Funds';

  constructor(private offer: OffersService, private router: Router) {}

  ngOnInit() {
    this.getoffers();
  }

  getoffers() {
    let data = {
      type: 'investment',
      category: this.selectedCat,
    };
    this.offer.getOffers(data).subscribe((r: any) => {
      this.isLoading = false;
      if (r.status) {
        console.log(r.response.onBoarded);
        this.categoryList = r.response.categoryList;
        this.offerList = r.response.offers;
        this.offersCount = r.response.totalCount;
        // this.badgeName = r.response.categoryList[0].category;
      }
      console.log(r);
    });
  }

  switchCat(cat: any, catname: any) {
    this.selectedCat = cat;
    this.getoffers();
    this.badgeName = catname;
  }

  interestPop(id: string) {
    this.selectedId = id;
    $('#interest').modal('show');
  }
  showInterest() {
    let data = { offerId: this.selectedId };
    this.offer.showInterest(data).subscribe((r: any) => {
      console.log(r);
      this.getoffers();
      $('#interest').modal('hide');
    });
  }
  viewOffer(id:any) {
    this.router.navigate(['/offer/view'], {
      queryParams: { offerId: id, cibilId: '' },
    });
  }
}
