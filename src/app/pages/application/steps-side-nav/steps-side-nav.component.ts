import { Component, Input, OnInit } from '@angular/core';
import { LoanApplicationService } from 'src/app/services/loan-application.service';

@Component({
  selector: 'app-steps-side-nav',
  templateUrl: './steps-side-nav.component.html',
  styleUrls: ['./steps-side-nav.component.css'],
})
export class StepsSideNavComponent implements OnInit {
  @Input('currentStep')
  currentStep: number = 3;

  @Input('id')
  id: string = '';

  @Input('cibilId')
  cibilId: string = '';

  @Input('title')
  title: string = 'No Data Found';

  offerImg: string = '';
  offerTitle: string = '';
  offerType: string = '';
  loading: boolean = true;
  step1: any;
  step2: any;
  step3: any;
  step4: any;
  step5: any;
  step6: any;

  constructor(private app: LoanApplicationService) {}

  ngOnInit() {
    setTimeout(() => {
      this.getDetails();
    }, 30);
  }

  getDetails() {
    let body = {};
    if (this.cibilId !== '') {
      body = {
        offerId: this.id,
        cibilId: this.cibilId,
      };
    } else {
      body = {
        offerId: this.id,
      };
    }

    this.app.applicationResolver(body).subscribe((r: any) => {
      console.log(r);
      this.offerImg = r.response.icon;
      this.offerTitle = r.response.title;
      this.offerType = r.response.type;

      for (let i = 0; i < r.response.data.length; i++) {
        switch (r.response.data[i].step) {
          case 'step 1':
            this.step1 = r.response.data[i];
            break;
          case 'step 2':
            this.step2 = r.response.data[i];
            break;
          case 'step 3':
            this.step3 = r.response.data[i];
            break;
          case 'step 4':
            this.step4 = r.response.data[i];
            break;
          case 'step 5':
            this.step5 = r.response.data[i];
            break;
          case 'step 6':
            this.step6 = r.response.data[i];
            break;
          default:
            break;
        }
      }
      this.loading = false;
      // console.log(this.step1, this.step2);
    });
  }
}
