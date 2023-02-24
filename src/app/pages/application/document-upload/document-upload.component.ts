import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  id: string = '';

  @Input() multiple: boolean = false;
  @Input() fileType: string = '';
  @Input() dragDropEnabled = true;
  @Output() filesChanged: EventEmitter<FileList>;

  @ViewChild('fileInput')
  inputRef!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filesChanged = new EventEmitter();
  }
  ngOnInit() {}

  addFiles(files: any): void {
    console.log(files);
    this.filesChanged.emit(files);
  }

  handleFileDrop(event: DragEvent) {
    if (event?.dataTransfer?.files?.length) {
      const files = event.dataTransfer.files;
      this.inputRef.nativeElement.files = files;
      this.addFiles(files);
    }
  }
}
