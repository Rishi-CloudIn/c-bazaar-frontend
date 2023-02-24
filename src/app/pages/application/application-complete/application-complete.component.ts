import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoanApplicationService } from 'src/app/services/loan-application.service';

@Component({
  selector: 'app-application-complete',
  templateUrl: './application-complete.component.html',
  styleUrls: ['./application-complete.component.css'],
})
export class ApplicationCompleteComponent implements OnInit {
  id: string = '';
  data: any;
  isLoading: boolean = true;
  tempId: string = '';
  permId: string = '';
  constructor(
    private alert: AlertService,
    private app: LoanApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    router.canceledNavigationResolution = 'computed';
    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getDetails();
  }

  getDetails() {
    let body = {
      offerId: this.id,
    };
    this.app.applicationResolver(body).subscribe((r: any) => {
      this.tempId = r.response.tempId;
      this.permId = r.response.permanentId;

      for (let i = 0; i < r.response.data.length; i++) {
        if (r.response.data[i].step == 'step 6') {
          this.data = r.response.data[i];
        }
      }
      this.isLoading = false;
      console.error(this.data, r);
    });
  }
}
