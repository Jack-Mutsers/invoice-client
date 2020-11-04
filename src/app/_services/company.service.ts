import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../_models/Company';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    constructor(private http: HttpClient) { }
    
    getCompanys(){
        return this.http.get(`http://localhost:9090/company`);
    }
    
    getCompany(companyId: number, userId: number){
        return this.http.get(`http://localhost:9090/company/${companyId}/${userId}`);
    }

    addCompany(company: Company, userId: number) {
        return this.http.post(`http://localhost:9090/company/${userId}`, company);
    }

    update(company: Company, userId: number) {
        return this.http.put(`http://localhost:9090/company/${userId}`, company);
    }

    delete(companyId: number, userId: number) {
        return this.http.delete(`http://localhost:9090/company/${companyId}/${userId}`);
    }
}