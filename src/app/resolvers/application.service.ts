import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { NetworkService } from '../services/network.service';
import { ProfileService } from '../services/profile.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private ps: ProfileService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    if (NetworkService.authToken != undefined) return this.ps.getProfile();
    return;
    // throw new Error('Method not implemented.');
  }

}
