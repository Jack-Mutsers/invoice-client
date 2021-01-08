import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Invoice } from '../_models';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
	SERVER_URL: string = "http://` + environment.apiUrl + `/Invoice/";
    constructor(private http: HttpClient) { }
    
    getIncommingInvoices(contactCode: string){
        return this.http.get<any>(`http://` + environment.apiUrl + `/Invoice/${contactCode}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    getOutgoingInvoices(){
        return this.http.get<any>(`http://` + environment.apiUrl + `/Invoice`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getInvoice(id: number){
        return this.http.get<any>(`http://` + environment.apiUrl + `/Invoice/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    uploadFile(formData: FormData){
        return this.http.post<any>(this.SERVER_URL, formData, {  
            reportProgress: true,  
            observe: 'events'  
          }); 
    }

    addInvoice(invoice: Invoice) {
        return this.http.post<any>(`http://` + environment.apiUrl + `/Invoice`, invoice);
    }

    update(invoice: Invoice) {
        return this.http.put<any>(`http://` + environment.apiUrl + `/Invoice/`, invoice);
    }

    delete(id: number) {
        return this.http.delete<any>(`http://` + environment.apiUrl + `/Invoice/${id}`);
    }
}