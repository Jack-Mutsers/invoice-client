import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../_models/Company';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    constructor(private http: HttpClient) { }
    
    getCompanys(){
        return this.http.get<any>(`http://localhost:9090/company/all`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getCompany(){
        return this.http.get<any>(`http://localhost:9090/company`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    getEmployees(){
        return this.http.get<any>(`http://localhost:9090/company/employees`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    addCompany(company: Company) {
        return this.http.post<any>(`http://localhost:9090/company`, company)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    sendEmploymentRequest(contactCode: string) {
        return this.http.post<any>(`http://localhost:9090/company/employee`, contactCode)
        .pipe(map(response => {
            if(response.status){
                return response.message;
            }
        }));
    }

    update(company: Company) {
        return this.http.put<any>(`http://localhost:9090/company`, company);
    }

    deleteEmployee(id: number) {
        return this.http.delete<any>(`http://localhost:9090/company/employee/${id}`);
    }

    deleteCompany() {
        return this.http.delete<any>(`http://localhost:9090/company`);
    }
}