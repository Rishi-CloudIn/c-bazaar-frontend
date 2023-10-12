import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { Spinkit } from 'ng-http-loader';
import { LoaderComponent } from './components/loader/loader.component';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { UrlService } from './services/url.service';


declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public loader = LoaderComponent;
  public spinkit = Spinkit;
  title = 'C-Bazaar';
  token: string = '';
  message: any = null;
  activeRoute: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private url: UrlService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
      }
      if (event instanceof NavigationEnd) {
      }
      if (event instanceof NavigationError) {
      }
    });
  }

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
    // localStorage.setItem(
    //   'accessToken',
    //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMiIsImp0aSI6IjU0YjIwNWNkNzY0OTQ5MDM3YzJlNGI5ZDU2MTM4OWNmZmM3MGE3ZjdhZmUxMDA0MGQxNGQyZTIxZjY4ZjBjNTBmNDNmOWE3MWI0YzAzODA1IiwiaWF0IjoxNjYxMjU1OTM0LjM2NjAwNywibmJmIjoxNjYxMjU1OTM0LjM2NjAxMywiZXhwIjoxNjkyNzkxOTM0LjMyNDMyMiwic3ViIjoiMTM3MyIsInNjb3BlcyI6W119.I67jrKsvMytg0I9Em2otw_oQ9FW98ma24YYDJgoLt3OSH6-DiZeGZ2YsxTJqr8D0-TrmNFkd47c1KvVNFa4u_DEU01HaX14ttBMd4WTRn9ZfI8uIg2_jvJutT_kgT3IOZGhL06x4IyGyXYvnCRDInh-BJk22wZm1goeaY-zeGwznVch425ji2DhbLrXLOb4cQd70pIQtpEq3Vu5k2zYwE9ZSddIBxry8tFYlx-7SHxfSkpPlJoakVZE-fQD6gwLscQyyTzsKgzKM-iePescm6KN_eTuQffXpS9q1jmB4bNhkRksvJYK-11JmC2vTOIG7Dy2jOTooqtZSAkCbqHxMHoE4EN6JeeYPtKV6PnmAbZ_vrKJRZDluaLALydogGtJQNpdNLs9Y5u94mdCfGwBHInbqM-M7aI_jxTQR9FyCygCy_l37h4AqZnOjXN4S2r84uQq5MYVepFnP4w55cc29cHkM6NKpEsiyOUCnDYBzafQ5KS03FWq__Nkkd1kI3NVWENEnrFI_Ind2FjuLYXVwOvZ1mu8TdJWQKQxkt1oOl_v_u-noIH-5Y6qnf8V6nnItqcM4EGJY2MvOhVRVXGbXPAzvUKhnBMxlbxStMN7eBuLNd2Aqkpa_KxPIzjC5MOk8TzPqs9X9AZLpmE9U3aIfagnDqf00Om8ydQ5Qco-utUs'
    // );

    if (localStorage.getItem('accessToken') !== undefined) {
      this.isLoggedIn = true;
    }
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          this.token = currentToken;
          console.log(currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      // console.log('Message received. ', payload);
      this.message = payload;
    });
  }
}
