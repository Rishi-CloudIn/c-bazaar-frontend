import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DsaService } from 'src/app/services/dsa.service';
import Validation from 'src/app/utils/confirm-passowrd';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/services/alert.service';
declare var $: any;

@Component({
  selector: 'app-fo-sidenav',
  templateUrl: './fo-sidenav.component.html',
  styleUrls: ['./fo-sidenav.component.css'],
})
export class FoSidenavComponent implements OnInit {
  @ViewChild('toggleButton') toggleButton: ElementRef | undefined;
  @ViewChild('menu') menu: ElementRef | undefined;

  passwordForm!: FormGroup;
  showPassword: boolean = false;
  isChecked: boolean = false;

  page: number = 1;
  countPerPage: number = 10;
  totalCount: number = 0;
  notificationList: any[] = [];
  totalUnseen: number = 0;
  constructor(
    private as: AuthService,
    private router: Router,
    private dsa: DsaService,
    private alert: AlertService,
    private fb: FormBuilder,
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
        $('.not-drop-active').toggleClass('not-drop-active');
      }
    });
  }

  ngOnInit() {
    this.initPasswordForm();
  }

  initPasswordForm() {
    this.isChecked = false;
    this.passwordForm = this.fb.group(
      {
        requestFrom: ['web'],
        requestType: ['changePassword'],
        oldPassword: ['', [Validators.required, Validators.minLength(8)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        cPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
      },
      {
        validators: [
          Validation.match('password', 'cPassword'),
          // Validation.unMatch("oldPassword", "password"),
        ],
      }
    );
  }

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
            localStorage.removeItem('Session_User');
            localStorage.clear();
            sessionStorage.clear();
          }
          console.log(r);
        });
        this.router.navigate(['home']);
        localStorage.removeItem('Session_User');
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
    $('.not-drop').toggleClass('not-drop-active');
  }
  hideNotification() {
    console.error('rishi');
    $('.not-drop-active').toggleClass('not-drop-active');
  }

  validatePassword(field: any) {
    if (
      ((this.isChecked && this.passwordForm.controls[field].invalid) ||
        (this.passwordForm.controls[field].invalid &&
          (this.passwordForm.controls[field].dirty ||
            this.passwordForm.controls[field].touched))) &&
      this.passwordForm.controls[field].errors
    ) {
      return true;
    }
    return false;
  }
  public togglePassword() {
    this.showPassword = !this.showPassword;
  }

  resetPasswordForm() {
    this.initPasswordForm();
  }

  changePwd() {
    if (this.passwordForm.invalid) {
      this.isChecked = true;
      return;
    }
    this.dsa.dsaChangePws(this.passwordForm.value).subscribe((r: any) => {
      this.alert.fireToastS(r.message[0]);
      $('#passwordModal').modal('hide');
      this.isChecked = false;
    });
  }

  unCheck() {
    this.isChecked = false;
    this.initPasswordForm();
  }

  enterPassword() {
    console.error(
      this.passwordForm.controls["password"].value,
      this.passwordForm.controls["cPassword"].value
    );
    this.passwordForm.valueChanges.subscribe();
    this.passwordForm.controls["password"].setValue(
      this.passwordForm.controls["password"].value
    );
    this.passwordForm.controls["cPassword"].setValue(
      this.passwordForm.controls["cPassword"].value
    );
    this.passwordForm.controls["oldPassword"].setValue(
      this.passwordForm.controls["oldPassword"].value
    );
  }
}
