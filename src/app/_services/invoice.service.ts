import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Invoice } from '../_models';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
    constructor(private http: HttpClient) { }
    
    getIncommingInvoices(contactCode: string){
        return this.http.get<any>(`http://localhost:9090/Invoice/${contactCode}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    getOutgoingInvoices(){
        return this.http.get<any>(`http://localhost:9090/Invoice`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getInvoice(id: number){
        return this.http.get<any>(`http://localhost:9090/Invoice/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    uploadFile(formData: FormData){
        
    }

    addInvoice(invoice: Invoice) {
        return this.http.post<any>(`http://localhost:9090/Invoice`, invoice);
    }

    update(invoice: Invoice) {
        return this.http.put<any>(`http://localhost:9090/Invoice/`, invoice);
    }

    delete(id: number) {
        return this.http.delete<any>(`http://localhost:9090/Invoice/${id}`);
    }
}