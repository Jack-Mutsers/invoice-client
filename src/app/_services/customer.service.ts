import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../_models/customer';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    constructor(private http: HttpClient) { }
    
    getCustomers(){
        return this.http.get<any>(`http://` + environment.apiUrl + `/customers`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getCustomer(id: number){
        return this.http.get<any>(`http://` + environment.apiUrl + `/customers/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    addCustomer(customer: Customer) {
        return this.http.post<any>(`http://` + environment.apiUrl + `/customers`, customer);
    }

    update(customer: Customer) {
        return this.http.put<any>(`http://` + environment.apiUrl + `/customers/`, customer);
    }

    delete(id: number) {
        return this.http.delete<any>(`http://` + environment.apiUrl + `/customers/${id}`);
    }
}