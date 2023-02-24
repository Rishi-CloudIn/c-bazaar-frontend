import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}
  fireToast(title: string) {
    Toast.fire({
      icon: 'success',
      // iconHtml: '<img src="../assets/img/export.svg" width="20px"/>',
      title: title,
    });
  }
  fireToastS(title: string) {
    Toast.fire({
      icon: 'success',
      // iconHtml: '<img src="../assets/img/success.svg" width="20px"/>',
      title: title,
    });
  }
  fireToastF(title: string) {
    Toast.fire({
      icon: 'error',
      // iconHtml: '<img src="../assets/img/fail.svg" width="20px"/>',
      title: title,
      color: '#EF4739',
    });
  }
}
