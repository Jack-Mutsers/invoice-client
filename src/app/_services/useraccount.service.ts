import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccount } from '../_models/useraccount';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserAccountService {
    private apiUrl: string = window["env"]["apiUrl"];
	private SERVER_URL: string = "http://"+ this.apiUrl +"/useraccount";
    constructor(private http: HttpClient) { }
        
    addUserAccount(useraccount: UserAccount) {
        return this.http.post<any>(this.SERVER_URL, useraccount);
    }

    update(id: number, useraccount: UserAccount) {
        return this.http.put<any>(this.SERVER_URL + `/${id}`, useraccount)
        .pipe(map(response => {
            if(response.status){
                return response.body;
            }
        }));
    }

    delete(id: number, password: string) {
        return this.http.request<any>('delete', this.SERVER_URL + `/${id}`, {body: {password}})
        .pipe(map(response => {
            if(response.status){
                return response.message;
            }
        }));
    }
}