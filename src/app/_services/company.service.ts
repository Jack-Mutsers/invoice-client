import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../_models/Company';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    constructor(private http: HttpClient) { }
    
    getCompanys(){
        return this.http.get<any>(`http://localhost:9090/company`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getCompany(companyId: number, userId: number){
        return this.http.get<any>(`http://localhost:9090/company/${companyId}/${userId}`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    addCompany(company: Company, userId: number) {
        return this.http.post<any>(`http://localhost:9090/company/${userId}`, company)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    update(company: Company, userId: number) {
        return this.http.put<any>(`http://localhost:9090/company/${userId}`, company);
    }

    delete(companyId: number, userId: number) {
        return this.http.delete<any>(`http://localhost:9090/company/${companyId}/${userId}`);
    }
}