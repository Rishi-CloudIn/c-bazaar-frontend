import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-top-nav-dsa',
  templateUrl: './top-nav-dsa.component.html',
  styleUrls: ['./top-nav-dsa.component.css'],
})
export class TopNavDsaComponent implements OnInit {
  constructor(private as: AuthService, private router: Router) {}

  ngOnInit() {}

  hamToggle() {
    $('.hamburger-menu').toggleClass('change');
    $('.nav-ul').toggleClass('new-ul');
  }

  logout2() {
    Swal.fire({
      text: 'Are you sure, you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#20bf55',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        this.as.logout().subscribe((r: any) => {
          if (r.status) {
            this.router.navigate(['home']);

            localStorage.clear();
            sessionStorage.clear();
          }
          console.log(r);
        });
        this.router.navigate(['home']);

        localStorage.clear();
        sessionStorage.clear();
        setTimeout(() => {
          location.reload();
        }, 600);
        // setTimeout(() => {
        //   location.reload();
        // }, 1000);
        // Swal.fire('Logged Out!');
      }
    });
  }
}
