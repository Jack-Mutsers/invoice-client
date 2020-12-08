import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../_models/customer';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    constructor(private http: HttpClient) { }
    
    getCustomers(){
        return this.http.get<any>(`http://localhost:9090/customers`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getCustomer(id: number){
        return this.http.get<any>(`http://localhost:9090/customers/${id}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    addCustomer(customer: Customer) {
        return this.http.post<any>(`http://localhost:9090/customers`, customer);
    }

    update(customer: Customer) {
        return this.http.put<any>(`http://localhost:9090/customers/`, customer);
    }

    delete(id: number) {
        return this.http.delete<any>(`http://localhost:9090/customers/${id}`);
    }
}