import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dsa-sign',
  templateUrl: './dsa-sign.component.html',
  styleUrls: ['./dsa-sign.component.css'],
})
export class DsaSignComponent implements OnInit {
  @Input() multiple: boolean = false;
  @Input() fileType: string = '.pdf,.jpg,.jpeg,.webe,.png';
  @Input() dragDropEnabled = true;
  @Output() filesChanged: EventEmitter<FileList>;

  @ViewChild('fileInput2' && 'fileInput')
  inputRef!: ElementRef<HTMLInputElement>;

  id: string = '';
  data: any;
  info: string = 'dfdsfsdf';
  docsUploadForm!: FormGroup;
  isLoading: boolean = true;
  tempId: string = '';
  termAccepted: boolean = false;
  isSubmitted: boolean = false;
  previewData: any;
  cibilId: string = '';

  constructor(
    private alert: AlertService,
    private app: LoanApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cs: CommonService
  ) {
    this.filesChanged = new EventEmitter();
    router.canceledNavigationResolution = 'computed';
    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }

  ngOnInit() {
    this.route.queryParams.subscribe((r: any) => {
      this.id = r.offerId;
      this.cibilId = r.cibilId;
    });
    this.getDetails();
    this.docsUploadForm = this.fb.group({
      sign: ['', [Validators.required]],
    });
  }
  getDetails() {
    let body = {
      offerId: this.id,
      cibilId: this.cibilId,
    };
    this.app.applicationResolver(body).subscribe((r: any) => {
      this.tempId = r.response.tempId;
      for (let i = 0; i < r.response.data.length; i++) {
        if (r.response.data[i].step == 'step 5') {
          this.data = r.response.data[i];
        }
      }
      this.isLoading = false;
      console.error(this.data);
    });
  }

  addFiles(files: any, field: any): void {
    console.log(files);
    if (files[0].size > 8388608) {
      this.alert.fireToastF('File size is too long');
      this.inputRef.nativeElement.value = '';
      return;
    }
    this.filesChanged.emit(files[0]);
    this.upload(files[0], field);
  }

  upload(file: File, field: any) {
    const formData = new FormData();
    formData.append('creditBazaarDocument', file);
    this.cs.upload(formData).subscribe((r: any) => {
      console.log(r);
      if (r.status) {
        console.log(r);
        this.docsUploadForm.controls[field].setValue(r.response.url);
        return r;
      }
    });
  }
  handleFileDrop(event: DragEvent, field: any) {
    if (event?.dataTransfer?.files?.length) {
      const files = event.dataTransfer.files;
      this.inputRef.nativeElement.files = files;
      this.addFiles(files, field);
    }
  }

  submit() {
    if (!this.termAccepted || this.docsUploadForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    let data = {
      tempId: this.tempId,
      signUrl: this.docsUploadForm.controls['sign'].value,
    };

    this.app.storeSignature(data).subscribe((r) => {
      console.log(r);
      if (r.status) {
        this.alert.fireToastS(r.message[0]);
      }
    });

    // this.router.navigate(['/offer/application/complete/' + this.id]);
    this.router.navigate(['/dsa/complete/apply'], {
      queryParams: { offerId: this.id, cibilId: this.cibilId },
    });
    setTimeout(() => {
      location.reload();
    }, 600);
  }
  removeFile(field: any) {
    this.docsUploadForm.controls[field].setValue('');
  }

  cancel() {
    let data = {
      applicationId: this.tempId,
    };
    console.error(data);
    this.app.cancelLoan(data).subscribe((r: any) => {
      if (r.status) {
        this.alert.fireToastS(r.message[0]);

        this.router.navigate(['/dsa/applications']);
      }
    });
  }
}
