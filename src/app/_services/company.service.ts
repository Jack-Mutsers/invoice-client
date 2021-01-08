import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../_models';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    constructor(private http: HttpClient) { }
    
    getCompanys(){
        return this.http.get<any>(`http://` + environment.apiUrl + `/company/all`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getCompany(){
        return this.http.get<any>(`http://` + environment.apiUrl + `/company`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    getEmployees(){
        return this.http.get<any>(`http://` + environment.apiUrl + `/company/employees`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    addCompany(company: Company) {
        return this.http.post<any>(`http://` + environment.apiUrl + `/company`, company)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    sendEmploymentRequest(contactCode: string) {
        return this.http.post<any>(`http://` + environment.apiUrl + `/company/employee`, contactCode)
        .pipe(map(response => {
            if(response.status){
                return response.message;
            }
        }));
    }

    update(company: Company) {
        return this.http.put<any>(`http://` + environment.apiUrl + `/company`, company);
    }

    deleteEmployee(id: number) {
        return this.http.delete<any>(`http://` + environment.apiUrl + `/company/employee/${id}`);
    }

    deleteCompany() {
        return this.http.delete<any>(`http://` + environment.apiUrl + `/company`);
    }
}