import { Injectable } from '@angular/core';
import { ApiCallService } from './apiCall.service';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class DsaService {
  constructor(private api: ApiCallService) {}

  getSources(): any {
    return this.api.getApiCallNoAuth(NetworkService.getSources());
  }
  getProfiles(): any {
    return this.api.getApiCallNoAuth(NetworkService.getProfiles());
  }
  getSetups(): any {
    return this.api.getApiCallNoAuth(NetworkService.getSetups());
  }
  getProducts(): any {
    return this.api.getApiCallNoAuth(NetworkService.getProducts());
  }
  getBanks(body: any) {
    return this.api.postApiCallAuth(NetworkService.getBanks(), body);
  }
  regGetBank() {
    return this.api.getApiCallNoAuth(NetworkService.regBankList());
  }
  getStates(): any {
    return this.api.getApiCallNoAuth(NetworkService.getStates());
  }

  //Profile
  getProfile(): any {
    return this.api.getApiCallAuth(NetworkService.dsaProfile());
  }
  updateProfile(body: any): any {
    return this.api.postApiCallAuth(NetworkService.dsaUpdateProfile(), body);
  }

  // Dashboard
  dsaDashboard(body: any): any {
    return this.api.postApiCallAuth(NetworkService.dsaDashboard(), body);
  }

  //Bank
  addBank(body: any): any {
    return this.api.postApiCallAuth(NetworkService.addBanks(), body);
  }

  getBankList(body: any): any {
    return this.api.postApiCallAuth(NetworkService.getaBankList(), body);
  }

  //Forgot Password

  forgotPassword(body: any): any {
    return this.api.postApiCallAuth(NetworkService.forgotPassword(), body);
  }
  updatePassword(body: any): any {
    return this.api.postApiCallAuth(NetworkService.dsaUpdatePassword(), body);
  }
  resendOTP(body: any): any {
    return this.api.postApiCallAuth(NetworkService.dsaResendOTP(), body);
  }

  //onboardDsa

  dsaOnboard(body: any): any {
    return this.api.postApiCallAuth(NetworkService.dsaOnboard(), body);
  }

  //DSA Offers
  dsaOffers(body: any): any {
    return this.api.postApiCallAuth(NetworkService.dsaOffers(), body);
  }

  dsaChangePws(body: any): any {
    return this.api.postApiCallAuth(NetworkService.dsaChangePassword(), body);
  }
}
