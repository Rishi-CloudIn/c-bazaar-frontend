import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoanApplicationService } from 'src/app/services/loan-application.service';

@Component({
  selector: 'app-dsa-preview-docs',
  templateUrl: './dsa-preview-docs.component.html',
  styleUrls: ['./dsa-preview-docs.component.css'],
})
export class DsaPreviewDocsComponent implements OnInit {
  id: string = '';
  data: any;
  isLoading: boolean = true;
  tempId: string = '';
  previewData: any;
  termAccepted: boolean = false;
  isSubmitted: boolean = false;
  cibilId: string = '';

  constructor(
    private alert: AlertService,
    private app: LoanApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((r: any) => {
      this.id = r.offerId;
      this.cibilId = r.cibilId;
    });
    this.getDetails();
  }

  getDetails() {
    let body = {
      offerId: this.id,
      cibilId: this.cibilId,

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
    this.app.previewDocuments({ tempId: this.tempId }).subscribe((r) => {
      this.previewData = r.response.reviewData;
      console.error(this.previewData);
    });
  }
  imgPreview(url: any) {
    window.open(url, '_blank')!.focus();
    // console.error(url);
  }

  submit() {
    if (!this.termAccepted) {
      this.isSubmitted = true;
      return;
    }
    this.router.navigate(['/dsa/sign/apply'], {
      queryParams: { offerId: this.id, cibilId: this.cibilId },
    });
    // this.router.navigate(['/offer/application/sign/' + this.id]);
  }

  back(){
    this.router.navigate(['/dsa/preview/apply'], {
      queryParams: { offerId: this.id, cibilId: this.cibilId },
    });
  }
}
