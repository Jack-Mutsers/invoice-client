import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../_models/customer';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    private apiUrl: string = window["env"]["apiUrl"];
	private SERVER_URL: string = "http://"+ this.apiUrl +"/customers";
    constructor(private http: HttpClient) { }
    
    getCustomers(){
        return this.http.get<any>(this.SERVER_URL)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getCustomer(id: number){
        return this.http.get<any>(this.SERVER_URL + `/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    addCustomer(customer: Customer) {
        return this.http.post<any>(this.SERVER_URL, customer);
    }

    update(customer: Customer) {
        return this.http.put<any>(this.SERVER_URL, customer);
    }

    delete(id: number) {
        return this.http.delete<any>(this.SERVER_URL + `/${id}`);
    }
}