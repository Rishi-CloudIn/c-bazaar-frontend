import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoanApplicationService } from 'src/app/services/loan-application.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  id: string = '';
  data: any;
  isLoading: boolean = true;
  tempId: string = '';
  termAccepted: boolean = false;
  isSubmitted: boolean = false;
  previewData: any;

  constructor(
    private alert: AlertService,
    private app: LoanApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
      for (let i = 0; i < r.response.data.length; i++) {
        if (r.response.data[i].step == 'step 4') {
          this.data = r.response.data[i];
        }
      }
      this.isLoading = false;
      this.getData();
      console.error(this.data);
    });
  }

  getData() {
    this.app.previewDetails({ tempId: this.tempId }).subscribe((r) => {
      this.previewData = r.response.reviewData;
      console.error(this.previewData);
    });
  }
  submit() {
    if (!this.termAccepted) {
      this.isSubmitted = true;
      return;
    }
    this.router.navigate(['/offer/application/preview_documents/' + this.id]);
  }
}
