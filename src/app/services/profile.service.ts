import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ApiCallService } from './apiCall.service';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profile: any = null;
  name: string = '';
  role: string = '';
  gUser: boolean = false;
  onBoarded: boolean = false;
  public pChange = new BehaviorSubject<any>(this.name);
  constructor(private api: ApiCallService) {}

  getProfile(): any {
    return this.api.getApiCallAuth(NetworkService.getProfile()).pipe(
      map((r: any) => {
        if (r.status == true) {
          // this.profile = r.response.profile_details;
          this.name = r.response.userData.personalData.name;
          // this.gUser = r.response.google_user;
          // this.pChange.next(r.response.role);
          this.role = r.response.userData.professionalData.type.name;
          this.onBoarded = r.response.onBoarded;
          console.error(r);
        }
        return r;
      })
    );
  }
}
