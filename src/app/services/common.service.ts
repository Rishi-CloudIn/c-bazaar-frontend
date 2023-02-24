import { Injectable } from '@angular/core';
import { ApiCallService } from './apiCall.service';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private api: ApiCallService) {}

  getDashboard(body: any): any {
    return this.api.postApiCallAuth(NetworkService.getDashboard(), body);
  }

  getProfile(): any {
    return this.api.getApiCallAuth(NetworkService.getProfile());
  }
  updateProfile(body: any): any {
    return this.api.postApiCallAuth(NetworkService.profileUpdate(), body);
  }
  logout(): any {
    return this.api.getApiCallAuth(NetworkService.logout());
  }

  getContents(data: any): any {
    return this.api.postApiCallAuth(NetworkService.getContent(), data);
  }

  getCFactors(data: any): any {
    return this.api.postApiCallAuth(NetworkService.getCFactors(), data);
  }

  upload(data: any) {
    return this.api.postApiCallAuthNEE(NetworkService.upload(), data);
  }

  getApplications(data: any) {
    return this.api.postApiCallAuth(NetworkService.getApplications(), data);
  }

  getFoApplications(body: any): any {
    return this.api.postApiCallAuth(NetworkService.foApplications(), body);
  }

  getReinitiatedDocs(body: any): any {
    return this.api.postApiCallAuth(NetworkService.getRejectedDocs(), body);
  }

  uploadReinitiatedDocs(body: any): any {
    return this.api.postApiCallAuth(NetworkService.storeRejectedDocs(), body);
  }

  getNotifications(body: any): any {
    return this.api.postApiCallAuth(NetworkService.getNotifications(), body);
  }

  getFaq(body: any): any {
    return this.api.postApiCallAuth(NetworkService.getFaq(), body);
  }
}
