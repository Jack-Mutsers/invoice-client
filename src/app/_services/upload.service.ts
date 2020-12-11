import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
	SERVER_URL: string = "http://localhost:9090/upload/";
  constructor(private http: HttpClient) { }

  public upload(formData: FormData) {
    return this.http.post<any>(this.SERVER_URL, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }

  public getDownload(id: number){
    // return this.http.get<any>(url);
    return this.http.get(this.SERVER_URL + `files/${id}`,{
      responseType: 'arraybuffer'
    });
  }

  public getMyFiles(){
    return this.http.get<any>(this.SERVER_URL + "send")
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        })); 
  }

  public getFilesForMe(){
    return this.http.get<any>(this.SERVER_URL + "received")
    .pipe(map(response => {
        if(response.status){
            return response.body;
        }
    })); 
  }

  delete(id: number) {
    return this.http.delete<any>(this.SERVER_URL + id);
  }
}
