import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { EncryptService } from '../services/encrypt.service';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertService } from './alert.service';
import * as auth from 'firebase/auth';
import { ApiCallService } from './apiCall.service';
import { NetworkService } from './network.service';
import { DsaService } from './dsa.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  idToken: string = '';
  public onPChange: BehaviorSubject<any> = new BehaviorSubject<any>(true);

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,
    private es: EncryptService,
    private alert: AlertService,
    private api: ApiCallService,
    private dsa: DsaService
  ) {}

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  GoogleAuthDsa() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(
        provider.setCustomParameters({ prompt: 'select_account' })
      )
      .then((result) => {
        console.error(result);
        // console.log(
        //   result.user?.getIdToken().then((r: any) => {
        //     console.error(r);
        //   }),
        //   typeof result.credential
        // );
        result.user?.getIdToken().then((r) => {
          // this.idToken = r;

          let data = {
            userName: result.user?.email,
            idToken: r,
            googleUser: 1,
          };
          this.login(data).subscribe((r) => {
            if (r.status) {
              this.alert.fireToastS(r.message[0]);
              sessionStorage.setItem('accessToken', r.response.accessToken);
              this.router.navigate(['dashboard']);
              sessionStorage.setItem('userId', r.response.userId);
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  AuthLogin2(provider: any) {
    return this.afAuth
      .signInWithPopup(
        provider.setCustomParameters({ prompt: 'select_account' })
      )
      .then((result) => {
        console.error(result);
        // console.log(
        //   result.user?.getIdToken().then((r: any) => {
        //     console.error(r);
        //   }),
        //   typeof result.credential
        // );
        result.user?.getIdToken().then((r) => {
          // this.idToken = r;

          let data = {
            userName: result.user?.email,
            idToken: r,
            googleUser: 1,
          };
          this.dsaLogin(data).subscribe((r) => {
            if (r.status) {
              this.alert.fireToastS(r.message[0]);
              sessionStorage.setItem('accessToken', r.response.accessToken);
              this.router.navigate(['dsa/dashboard']);
              sessionStorage.setItem('userId', r.response.userId);
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  Register(data: FormData) {
    return this.api.postApiCallNoAuth(NetworkService.register(), data);
  }

  login(data: any) {
    return this.api.postApiCallNoAuth(NetworkService.login(), data);
  }

  dsaLogin(data: any) {
    return this.api.postApiCallNoAuth(NetworkService.dsaLogin(), data);
  }

  reSentOtp(data: any) {
    return this.api.postApiCallNoAuth(NetworkService.resendOTP(), data);
  }

  verifyOtp(data: any) {
    return this.api.postApiCallNoAuth(NetworkService.verifyOTP(), data);
  }
  getOrgName(data: any) {
    return this.api.postApiCallNoAuth(NetworkService.orgName(), data);
  }
  onBoard(data: FormData) {
    return this.api.postApiCallAuth(NetworkService.onBoard(), data);
  }

  logout() {
    sessionStorage.clear();
    return this.api.getApiCallAuth(NetworkService.logout());
  }
}
