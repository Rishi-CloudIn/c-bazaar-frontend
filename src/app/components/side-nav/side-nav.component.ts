import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  @ViewChild('toggleButton') toggleButton: ElementRef | undefined;
  @ViewChild('menu') menu: ElementRef | undefined;

  page: number = 1;
  countPerPage: number = 100;
  totalCount: number = 0;
  notificationList: any[] = [];
  totalUnseen: number = 0;
  showNotifications: boolean = false;
  constructor(
    private as: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private cs: CommonService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      if (
        e.target !== this.toggleButton!.nativeElement &&
        e.target !== this.menu!.nativeElement
      ) {
        // $('.not-drop-active').toggleClass('not-drop-active');
        this.showNotifications = false;
      }
    });
  }

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

  getNotification() {
    let data = {
      page: this.page,
      countPerPage: this.countPerPage,
    };
    this.cs.getNotifications(data).subscribe((r: any) => {
      console.error(r);
      this.totalCount = r.response.totalCount;
      this.notificationList = r.response.notifications;
      this.totalUnseen = r.response.unreadCount;
    });
  }

  showNotification() {
    // $('.not-drop').addClass('not-drop-active');
    this.showNotifications = !this.showNotifications;
  }
  hideNotification() {
    // $('.not-drop').toggleClass('not-drop-active');
    this.showNotifications = false;
  }
}
