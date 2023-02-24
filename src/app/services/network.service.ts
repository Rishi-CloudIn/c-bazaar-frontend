import { Injectable } from '@angular/core';
import { Consts } from '../utils/consts';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor() {}

  static server_url(): string {
    return Consts.URL();
  }

  static server_v(): string {
    return '/api/v1.0';
  }

  static getAuthHeader(): HttpHeaders {
    let header = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.authToken(),
    });
    return header;
  }

  static getHeader(): HttpHeaders {
    let header = new HttpHeaders();
    return header;
  }

  static authToken(): any {
    return sessionStorage.getItem('accessToken') || undefined;
  }

  // Authentication

  static login(): string {
    return this.server_url() + this.server_v() + '/login';
  }
  static register(): string {
    return this.server_url() + this.server_v() + '/register';
  }
  static verifyOTP(): string {
    return this.server_url() + this.server_v() + '/verify_otp';
  }
  static resendOTP(): string {
    return this.server_url() + this.server_v() + '/resend_otp';
  }
  static logout(): string {
    return this.server_url() + this.server_v() + '/logout';
  }
  static forgetPassowrd(): string {
    return this.server_url() + this.server_v() + '/forget_password';
  }
  static updatePassword(): string {
    return this.server_url() + this.server_v() + '/update_password';
  }
  static orgName(): string {
    return this.server_url() + this.server_v() + '/get_organizations';
  }
  static onBoard(): string {
    return this.server_url() + this.server_v() + '/get_cibil';
  }

  //Users
  static getDashboard(): string {
    return this.server_url() + this.server_v() + '/dashboard';
  }
  static getCibil(): string {
    return this.server_url() + this.server_v() + '/get_cibil';
  }

  static getProfile(): string {
    return this.server_url() + this.server_v() + '/get_profile';
  }
  static profileUpdate(): string {
    return this.server_url() + this.server_v() + '/update_profile';
  }
  static changePassword(): string {
    return this.server_url() + this.server_v() + '/change_password';
  }

  //offers
  static getOffers(): string {
    return this.server_url() + this.server_v() + '/get_offers';
  }
  static viewOfferDetails(): string {
    return this.server_url() + this.server_v() + '/get_offer_details';
  }
  static getOffersCat(): string {
    return this.server_url() + this.server_v() + '/get_offer_categories';
  }
  static getOffersType(): string {
    return this.server_url() + this.server_v() + '/get_offer_types';
  }

  static showInterest(): string {
    return this.server_url() + this.server_v() + '/mark_offer_interested';
  }

  //contents
  static getContent(): string {
    return this.server_url() + this.server_v() + '/get_contents';
  }

  //c-factors
  static getCFactors(): string {
    return this.server_url() + this.server_v() + '/get_credit_factor';
  }

  //Common
  static upload(): string {
    return this.server_url() + this.server_v() + '/upload_document';
  }

  static regBankList(): string {
    return this.server_url() + this.server_v() + '/admin/get_bank_list';
  }

  //Application
  static applicationResolver(): string {
    return this.server_url() + this.server_v() + '/get_loan_description';
  }

  static personalDetailsPopulate(): string {
    return this.server_url() + this.server_v() + '/get_personal_data';
  }
  static getLoanData(): string {
    return this.server_url() + this.server_v() + '/get_loan_data';
  }

  static getStates(): string {
    return this.server_url() + this.server_v() + '/get_state_list';
  }

  static getOrgType(): string {
    return this.server_url() + this.server_v() + '/get_organization_type_list';
  }
  static getOrgSector(): string {
    return (
      this.server_url() + this.server_v() + '/get_organization_sector_list'
    );
  }
  static savePersonalDate(): string {
    return this.server_url() + this.server_v() + '/store_personal_data';
  }

  static saveLoanDocuments(): string {
    return this.server_url() + this.server_v() + '/store_loan_document';
  }

  static getSavedDocuments(): string {
    return this.server_url() + this.server_v() + '/get_loan_document';
  }

  static storeSignature(): string {
    return this.server_url() + this.server_v() + '/store_signature';
  }

  static previewDetails(): string {
    return this.server_url() + this.server_v() + '/get_personal_data_review';
  }

  static previewDocuments(): string {
    return this.server_url() + this.server_v() + '/get_loan_document_review';
  }

  static getApplications(): string {
    return this.server_url() + this.server_v() + '/get_my_applications';
  }
  static getCourses(): string {
    return this.server_url() + this.server_v() + '/get_course_list';
  }

  //DSA calls
  static dsaLogin(): string {
    return this.server_url() + this.server_v() + '/dsa/login';
  }

  static dsaDashboard(): string {
    return this.server_url() + this.server_v() + '/dsa/dashboard';
  }

  static dsaProfile(): string {
    return this.server_url() + this.server_v() + '/dsa/get_profile';
  }
  static dsaUpdateProfile(): string {
    return this.server_url() + this.server_v() + '/dsa/update_profile';
  }
  static getSources(): string {
    return this.server_url() + this.server_v() + '/dsa/get_sources';
  }
  static getProfiles(): string {
    return this.server_url() + this.server_v() + '/dsa/get_profiles';
  }
  static getSetups(): string {
    return this.server_url() + this.server_v() + '/dsa/get_setups';
  }
  static getProducts(): string {
    return this.server_url() + this.server_v() + '/dsa/get_products';
  }

  static getBanks(): string {
    return this.server_url() + this.server_v() + '/admin/get_bank';
  }

  //banks
  static addBanks(): string {
    return this.server_url() + this.server_v() + '/dsa/add_bank_account';
  }

  static getaBankList(): string {
    return this.server_url() + this.server_v() + '/dsa/get_bank_accounts';
  }

  //Forgot Password (DSA)

  static forgotPassword(): string {
    return this.server_url() + this.server_v() + '/dsa/forget_password';
  }
  static dsaUpdatePassword(): string {
    return this.server_url() + this.server_v() + '/dsa/update_password';
  }
  static dsaResendOTP(): string {
    return this.server_url() + this.server_v() + '/dsa/resend_otp';
  }

  //onboardDSA
  static dsaOnboard(): string {
    return this.server_url() + this.server_v() + '/dsa/get_cibil_score';
  }

  //DSA Offers
  static dsaOffers(): string {
    return this.server_url() + this.server_v() + '/dsa/get_offers';
  }

  //FO applications
  static foApplications(): string {
    return this.server_url() + this.server_v() + '/fo/get_my_applications';
  }

  static getRejectedDocs(): string {
    return (
      this.server_url() + this.server_v() + '/reinitiate/get_document_list'
    );
  }

  static storeRejectedDocs(): string {
    return this.server_url() + this.server_v() + '/reinitiate/store_documents';
  }

  static getNotifications(): string {
    return this.server_url() + this.server_v() + '/notifications';
  }

  //faq
  static getFaq(): string {
    return this.server_url() + this.server_v() + '/get_faq_list';
  }

  static dsaChangePassword(): string {
    return this.server_url() + this.server_v() + '/dsa/change_password';
  }

  static cancelLoan(): string {
    return this.server_url() + this.server_v() + '/cancel_application';
  }
}
