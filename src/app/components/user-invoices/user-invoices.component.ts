import { Component, OnInit } from '@angular/core';
import { FileRecord } from 'src/app/_models';
import { AlertService, UploadService } from  '../../_services';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-invoices',
  templateUrl: './user-invoices.component.html',
  styleUrls: ['./user-invoices.component.css']
})
export class UserInvoicesComponent implements OnInit {
  fileRecordsForMe: FileRecord[];
  downloadIcon = faFileDownload;

  constructor(
    private uploadService: UploadService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadFilesForMe();
  }

  loadFilesForMe(){
    this.uploadService.getFilesForMe().subscribe((data)=>{
        this.fileRecordsForMe = <FileRecord[]> data;
    });
  }

  onDownload(url: string, rawFilename: string){
    this.uploadService.getDownload(url)
      .subscribe(response => {
        let filename = rawFilename.split("-")[0];
        let blob = new Blob([response], { type: "application/pdf"});
        let createdURL = window.URL.createObjectURL(blob);

        let a = $("<a />", {
          // target: "_blank",
          href: createdURL,
          download: filename
        })
        .appendTo("body")
        .get(0).click();

      });
  }

}
