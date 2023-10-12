import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { EncryptService } from './encrypt.service';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(
    private http: HttpClient,
    private es: EncryptService,
    private router: Router,
    private alert: AlertService
  ) {}

  postApiCallAuth(url: string, body: object) {
    console.log(body);
    let obj = this.es.dataIn(body);
    return this.http
      .post(url, obj, {
        headers: NetworkService.getAuthHeader(),
      })
      .pipe(
        map((r: any) => {
          let result: any = this.es.unmaskData(r);
          console.warn(r, result);
          if (result.status == true) {
            return result;
          } else {
            this.alert.fireToastF(result.response.message[0]);
          }
        }),
        catchError((err) => {
          if (err.status == 401 || err.status == 403) {
            this.router.navigate(['/home']);
            localStorage.clear();
            sessionStorage.clear();
          } else if (err.status == 500 || err.status == 429) {
            this.alert.fireToastF('Server error, Try again later');
          } else if (err.status == 400) {
            let data: any = this.es.unmaskData(err.error);
            // console.log(data.message[0]);
            this.alert.fireToastF(data.message[0]);
          }

          return '';
        })
      );
  }
  postApiCallNoAuth(url: string, body: object) {
    console.log(body);
    let obj = this.es.dataIn(body);
    return this.http
      .post(url, obj, {
        headers: NetworkService.getHeader(),
      })
      .pipe(
        map((r: any) => {
          let result: any = this.es.unmaskData(r);
          if (result.status == true) {
            return result;
          } else {
            this.alert.fireToastF(result.response.message[0]);
            return result;
          }
        }),
        catchError((err: any) => {
          console.log(err);
          let data: any = this.es.unmaskData(err.error);
          // console.log(data.message[0]);
          this.alert.fireToastF(data.message[0]);

          return '';
        })
      );
  }

  postApiCallAuthNEE(url: string, body: object) {
    console.log(body);
    return this.http
      .post(url, body, {
        headers: NetworkService.getAuthHeader(),
      })
      .pipe(
        map((r: any) => {
          let result: any = this.es.unmaskData(r);
          console.log(r);
          return result;
          // if (r.status == true) {
          //   return r;
          // } else {
          //   this.alert.fireToastF(r.response.message[0]);
          // }
        }),
        catchError((err: any) => {
          let data: any = this.es.unmaskData(err.error);
          this.alert.fireToastF(data.message[0]);
          return '';
        })
      );
  }

  getApiCallAuth(url: string): any {
    return this.http
      .get(url, {
        headers: NetworkService.getAuthHeader(),
      })
      .pipe(
        map((r: any) => {
          let result: any = this.es.unmaskData(r);
          console.log(result);
          if (result.status == true) {
            return result;
          } else {
            this.alert.fireToastF(result.response.message[0]);
          }
        }),
        catchError((err: any) => {
          if (err.status == 401 || err.status == 403) {
            this.router.navigate(['/home']);
            localStorage.clear();
            sessionStorage.clear();
          } else if (err.status == 500 || err.status == 429) {
            this.alert.fireToastF('Server error, Try again later');
          } else if (err.status == 400) {
            let data: any = this.es.unmaskData(err.error);
            // console.log(data.message[0]);
            this.alert.fireToastF(data.message[0]);
          }
          return '';
        })
      );
  }
  getApiCallNoAuth(url: string): any {
    return this.http
      .get(url, {
        headers: NetworkService.getHeader(),
      })
      .pipe(
        map((r: any) => {
          let result: any = this.es.unmaskData(r);
          console.log(result);
          if (result.status == true) {
            return result;
          } else {
            this.alert.fireToastF(result.response.message[0]);
            return result;
          }
        }),
        catchError((err: any) => {
          let data: any = this.es.unmaskData(err.error);
          // console.log(data.message[0]);
          this.alert.fireToastF(data.message[0]);
          return '';
        })
      );
  }

  postApiCallAuthNE(url: string, body: object) {
    console.log(body);
    return this.http
      .post(url, body, {
        headers: NetworkService.getAuthHeader(),
      })
      .pipe(
        map((r: any) => {
          console.log(r);
          if (r.status == true) {
            return r;
          } else {
            this.alert.fireToastF(r.response.message[0]);
          }
        }),
        catchError((err) => {
          let data: any = this.es.unmaskData(err.error);
          // console.log(data.message[0]);
          this.alert.fireToastF(data.message[0]);
          return '';
        })
      );
  }

  getApiCallAuthNE(url: string): any {
    return this.http
      .get(url, {
        headers: NetworkService.getAuthHeader(),
      })
      .pipe(
        map((r: any) => {
          return r;
        }),
        catchError((err) => {
          let data: any = this.es.unmaskData(err.error);
          // console.log(data.message[0]);
          this.alert.fireToastF(data.message[0]);
          return '';
        })
      );
  }
}
