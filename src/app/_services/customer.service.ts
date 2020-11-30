import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../_models/customer';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    constructor(private http: HttpClient) { }
    
    getCustomers(companyId: number){
        return this.http.get<any>(`http://localhost:9090/customers/${companyId}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getCustomer(id: number, companyId: number){
        return this.http.get<any>(`http://localhost:9090/customers/${id}/${companyId}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    addCustomer(customer: Customer) {
        console.log(customer);
        return this.http.post<any>(`http://localhost:9090/customers`, customer);
    }

    update(customer: Customer) {
        return this.http.put<any>(`http://localhost:9090/customers/`, customer);
    }

    delete(id: number, companyId: number) {
        return this.http.delete<any>(`http://localhost:9090/customers/${id}/${companyId}`);
    }
}