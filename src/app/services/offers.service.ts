import { Injectable } from '@angular/core';
import { ApiCallService } from './apiCall.service';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor(private api: ApiCallService) {}

  getOffers(body: any): any {
    return this.api.postApiCallAuth(NetworkService.getOffers(), body);
  }

  viewOfferDetails(body: any): any {
    return this.api.postApiCallAuth(NetworkService.viewOfferDetails(), body);
  }

  getOffersCat(body: any): any {
    return this.api.postApiCallAuth(NetworkService.getOffersCat(), body);
  }

  getOffersType(body: any): any {
    return this.api.postApiCallAuth(NetworkService.getOffersType(), body);
  }

  showInterest(body: any): any {
    return this.api.postApiCallAuth(NetworkService.showInterest(), body);
  }

}
