import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { AlertService, CustomerService, UploadService } from  '../../_services';
import { FileRecord, Customer } from '../../_models';
import { faTrash, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})

export class InvoicesComponent implements OnInit {
  fileRecordForm: FormGroup;
  formFileRecord: FileRecord = new FileRecord();
  MyfileRecords: FileRecord[];
  fileRecordsForMe: FileRecord[];
  customers: Customer[];
  deleteFile: FileRecord = new FileRecord();
  loading = false;
  submitted = false;
  trashIcon = faTrash;
  downloadIcon = faFileDownload;

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  
  constructor(
    private customerApiService: CustomerService,
    private uploadService: UploadService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadMyFiles();
    this.loadFilesForMe();

    this.fileRecordForm = this.formBuilder.group({
      customerId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.fileRecordForm.controls; }

  loadCustomers(){
    this.customerApiService.getCustomers().subscribe((data)=>{
      this.customers = <Customer[]> data;
    });
  }

  loadMyFiles(){
    this.uploadService.getMyFiles().subscribe((data)=>{
        this.MyfileRecords = <FileRecord[]> data;
    });
  }

  loadFilesForMe(){
    this.uploadService.getFilesForMe().subscribe((data)=>{
        this.fileRecordsForMe = <FileRecord[]> data;
    });
  }

  uploadFile(file, customerId) {  
    const formData = new FormData();  
    formData.append('file', file.data); 
    formData.append('customerId', customerId); 
    
    
    file.inProgress = true;  
    this.uploadService.upload(formData).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        file.inProgress = false;  
        if (typeof (event) === 'object') {  
          this.loadMyFiles();
        }  
      });  
  }

  private uploadFiles(customerId: number) {  
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      if(file.progress == 0){
        this.uploadFile(file, customerId);  
      }
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

        // let pwa = window.open(createdURL, "test.pdf");
        // if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        //     alert( 'Please disable your Pop-up blocker and try again.');
        // }
      });


    
  }

  onClick() {  
    const fileUpload = this.fileUpload.nativeElement;

    fileUpload.onchange = () => {  
      for (let index = 0; index < fileUpload.files.length; index++) {  
        const file = fileUpload.files[index];  
        this.files.push({ data: file, inProgress: false, progress: 0, filename: file.name});  
      }  
    };  

    fileUpload.click();  
  }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.fileRecordForm.invalid) {
      return;
    }
    
    this.loading = true;

    var customerId = this.fileRecordForm.value.customerId;
    this.uploadFiles(customerId);  

    this.loading = false;
  }

  onDelete(id){
    this.uploadService.delete(id).subscribe(
      data => {
        console.log(data.message);
        this.alertService.success(data.message, true);
        this.loadMyFiles();
      },
      error => {
        console.log(error);
        this.alertService.error(error);
      }
    );
  }

  onSetDeleteData(id){
    this.deleteFile = this.MyfileRecords.filter(x => x.id === id)[0];
  }
}
