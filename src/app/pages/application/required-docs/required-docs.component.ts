import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileComponent } from '../../account/profile/profile.component';
declare var $: any;

@Component({
  selector: 'app-required-docs',
  templateUrl: './required-docs.component.html',
  styleUrls: ['./required-docs.component.css'],
})
export class RequiredDocsComponent implements OnInit {
  @Input() multiple: boolean = false;
  @Input() fileType: string = '';
  @Input() dragDropEnabled = true;
  @Output() filesChanged: EventEmitter<FileList>;

  @ViewChild('fileInput')
  inputRef!: ElementRef<HTMLInputElement>;
  role: string = '';
  id: string = '';
  docsUploadForm!: FormGroup;
  data: any;
  isLoading: boolean = true;
  termAccepted: boolean = false;
  isSubmitted: boolean = false;
  aadharBackEnabled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    private cs: CommonService,
    private app: LoanApplicationService,
    private ps: ProfileService
  ) {
    this.filesChanged = new EventEmitter();
  }

  ngOnInit() {
    this.role = this.ps.role;
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getDetails();
    this.docsUploadForm = this.fb.group({
      pan: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      aadhar1: ['', [Validators.required]],
      aadhar2: [''],
    });
  }

  getDetails() {
    let body = {
      offerId: this.id,
    };
    this.app.applicationResolver(body).subscribe((r: any) => {
      for (let i = 0; i < r.response.data.length; i++) {
        if (r.response.data[i].step == 'step 3') {
          this.data = r.response.data[i];
        }
      }
      this.isLoading = false;
      console.log(this.data);
    });
  }

  submit() {
    console.log(this.docsUploadForm.value, this.docsUploadForm.valid);
    // if (!this.termAccepted) {
    //   this.isSubmitted = true;
    //   return;
    // }
    this.router.navigate(['/offer/application/preview_details/' + this.id]);
  }

  addFiles(files: any, field: any): void {
    console.log(files);
    this.filesChanged.emit(files[0]);
    this.upload(files[0], field);
  }

  handleFileDrop(event: DragEvent, field: any) {
    if (event?.dataTransfer?.files?.length) {
      const files = event.dataTransfer.files;
      this.inputRef.nativeElement.files = files;
      this.addFiles(files, field);
    }
  }

  addAadharBack() {
    this.aadharBackEnabled = !this.aadharBackEnabled;
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
}
