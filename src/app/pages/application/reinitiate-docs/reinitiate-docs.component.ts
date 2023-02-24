import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
declare var $: any;

@Component({
  selector: 'app-reinitiate-docs',
  templateUrl: './reinitiate-docs.component.html',
  styleUrls: ['./reinitiate-docs.component.css'],
})
export class ReinitiateDocsComponent implements OnInit {
  @Input() multiple: boolean = false;
  @Input() fileType: string = '.pdf,.jpg,.jpeg,.webe,.png';
  @Input() dragDropEnabled = true;
  @Output() filesChanged: EventEmitter<FileList>;
  @ViewChild('fileInput' && 'fileInput2' && 'fileInput3')
  inputRef0!: ElementRef<HTMLInputElement>;

  docsUploadForm!: FormGroup;
  isSubmitted: boolean = false;
  role: string = '';
  id: string = '';
  isloading: boolean = true;
  docsList: any[] = [];
  Multiple: any[] = [];
  constructor(
    private router: Router,
    private cs: CommonService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private fb: FormBuilder
  ) {
    this.filesChanged = new EventEmitter();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getDocs();
    this.docsUploadForm = this.fb.group({});
  }

  view() {
    this.router.navigate(['dsa/dashboard']);
  }

  getDocs() {
    this.cs
      .getReinitiatedDocs({ applicationId: this.id })
      .subscribe((r: any) => {
        console.log(r);
        this.role = r.role;
        this.docsList = r.response.documentList;
        for (let data of r.response.documentList) {
          // if(data.urlList.length==1){

          // }
          this.docsUploadForm.addControl(
            data.type,
            new FormControl('', [Validators.required])
          );
          for (let url of data.urlList) {
            console.error(url);
          }
        }
        this.isloading = false;
      });
  }

  addFiles(files: any, field: any): void {
    // console.error(files.files)
    console.log(files);
    if (files.files[0].size > 8388608) {
      this.alert.fireToastF('File size is too long');
      $('#test').val(null);

      return;
    }
    this.filesChanged.emit(files.files[0]);
    this.upload(files.files[0], field);
    this.pushArray();
  }

  upload(file: File, field: any) {
    console.error(field);
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
      // this.inputRef.nativeElement.files = files;
      this.addFiles(files, field);
    }
  }

  removeFile(field: any) {
    $('#test').val(null);
    this.docsUploadForm.controls[field].setValue('');
  }

  submit() {
    // this.docsUploadForm.controls['applicationId'].setValue(this.id);
    if (this.docsUploadForm.invalid) {
      this.isSubmitted = true;
      return;
    }

    let data = {
      documentList: this.pushArray(),
      applicationId: this.id,
    };
    // console.error(data);
    this.cs.uploadReinitiatedDocs(data).subscribe((r: any) => {
      console.log(r);
      this.alert.fireToastS(r.response.message[0]);
      this.router.navigate(['fo/applications']);
    });
  }

  pushArray() {
    let data = [];
    for (let doc in this.docsUploadForm.value) {
      console.error(doc);
      let temp = {
        type: doc,
        url: this.docsUploadForm.controls[doc].value,
      };
      data.push(temp);
      // console.warn(temp);
    }
    return data;
  }
  getUrlLoop(type: any) {}
}
