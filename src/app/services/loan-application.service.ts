import { Injectable } from '@angular/core';
import { ApiCallService } from './apiCall.service';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class LoanApplicationService {
  constructor(private api: ApiCallService) {}

  applicationResolver(body: any): any {
    return this.api.postApiCallAuth(NetworkService.applicationResolver(), body);
  }

  applicationPersonalDetails(body: any): any {
    return this.api.postApiCallAuth(
      NetworkService.personalDetailsPopulate(),
      body
    );
  }

  getStates(): any {
    return this.api.getApiCallAuth(NetworkService.getStates());
  }

  getOrgType(data: any): any {
    return this.api.postApiCallAuth(NetworkService.getOrgType(), data);
  }

  getOrgSector(data: any): any {
    return this.api.postApiCallAuth(NetworkService.getOrgSector(), data);
  }

  getLoanData(data: any): any {
    return this.api.postApiCallAuth(NetworkService.getLoanData(), data);
  }

  savePersonalData(data: any): any {
    return this.api.postApiCallAuth(NetworkService.savePersonalDate(), data);
  }

  saveLoanDocuments(data: any): any {
    return this.api.postApiCallAuth(NetworkService.saveLoanDocuments(), data);
  }

  getSavedLoanDocuments(data: any): any {
    return this.api.postApiCallAuth(NetworkService.getSavedDocuments(), data);
  }

  storeSignature(data: any) {
    return this.api.postApiCallAuth(NetworkService.storeSignature(), data);
  }

  previewDetails(data: any) {
    return this.api.postApiCallAuth(NetworkService.previewDetails(), data);
  }

  previewDocuments(data: any) {
    return this.api.postApiCallAuth(NetworkService.previewDocuments(), data);
  }

  getCourses(data: any) {
    return this.api.postApiCallAuth(NetworkService.getCourses(), data);
  }

  cancelLoan(data: any) {
    return this.api.postApiCallAuth(NetworkService.cancelLoan(), data);
  }
}
