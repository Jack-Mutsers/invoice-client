import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../_models';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    private apiUrl: string = window["env"]["apiUrl"];
	private SERVER_URL: string = "http://"+ this.apiUrl +"/company";
    constructor(private http: HttpClient) { }
    
    getCompanys(){
        return this.http.get<any>(this.SERVER_URL + `/all`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }
    
    getCompany(){
        return this.http.get<any>(this.SERVER_URL)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    getEmployees(){
        return this.http.get<any>(this.SERVER_URL + `/employees`)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    addCompany(company: Company) {
        return this.http.post<any>(this.SERVER_URL, company)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    sendEmploymentRequest(contactCode: string) {
        return this.http.post<any>(this.SERVER_URL + `/employee`, contactCode)
        .pipe(map(response => {
            if(response.status){
                return response.message;
            }
        }));
    }

    update(company: Company) {
        return this.http.put<any>(this.SERVER_URL, company);
    }

    deleteEmployee(id: number) {
        return this.http.delete<any>(this.SERVER_URL + `/employee/${id}`);
    }

    deleteCompany() {
        return this.http.delete<any>(this.SERVER_URL);
    }
}