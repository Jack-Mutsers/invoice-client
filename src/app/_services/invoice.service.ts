import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Invoice } from '../_models';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
    private apiUrl: string = window["env"]["apiUrl"];
    private SERVER_URL: string = "http://"+ this.apiUrl +"/Invoice";
    constructor(private http: HttpClient) { }
    
    getIncommingInvoices(contactCode: string){
        return this.http.get<any>(this.SERVER_URL + `/${contactCode}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    getOutgoingInvoices(){
        return this.http.get<any>(this.SERVER_URL)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getInvoice(id: number){
        return this.http.get<any>(this.SERVER_URL + `/${id}`)
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
        return this.http.post<any>(this.SERVER_URL, invoice);
    }

    update(invoice: Invoice) {
        return this.http.put<any>(this.SERVER_URL, invoice);
    }

    delete(id: number) {
        return this.http.delete<any>(this.SERVER_URL + `/${id}`);
    }
}