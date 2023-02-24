import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  newsList: any[] = [];
  totalCount: number = 0;
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  gAuth() {
    this.auth.GoogleAuth();
  }
}
