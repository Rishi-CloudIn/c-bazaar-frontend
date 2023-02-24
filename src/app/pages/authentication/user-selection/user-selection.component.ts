import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css'],
})
export class UserSelectionComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  redirectClient() {
    this.router.navigate(['/login']).then(() => {
      location.reload();
    });
  }
  redirectDsa() {
    this.router.navigate(['/dsa/login']).then(() => {
      location.reload();
    });
  }
}
