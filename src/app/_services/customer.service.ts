import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../_models/customer';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    constructor(private http: HttpClient) { }
    
    getCustomers(){
        return this.http.get(`http://localhost:9090/customers`);
    }
    
    getCustomer(id: number){
        return this.http.get(`http://localhost:9090/customers/${id}`);
    }

    addCustomer(customer: Customer) {
        return this.http.post(`http://localhost:9090/customers`, customer);
    }

    update(customer: Customer) {
        return this.http.put(`http://localhost:9090/customers/`, customer);
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:9090/customers/${id}`);
    }
}